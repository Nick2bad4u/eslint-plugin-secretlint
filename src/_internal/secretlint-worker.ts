import { isMainThread, parentPort } from "node:worker_threads";
import { runSecretLint } from "secretlint";
import { isDefined, safeCastTo } from "ts-extras";

import type {
    SecretlintWorkerRequest,
    SecretlintWorkerResponse,
    SerializableSecretlintMessage,
    SerializableSecretlintResult,
} from "./secretlint-worker-types.js";

const DONE_STATE = 1 as const;

type SecretLintJsonMessage = Readonly<{
    loc?: {
        end?: { column?: number; line?: number };
        start?: { column?: number; line?: number };
    };
    message?: string;
    messageId?: string;
    ruleId?: string;
    severity?: string;
}>;
type SecretLintJsonResult = Readonly<{
    messages?: readonly SecretLintJsonMessage[];
}>;

const toSerializableMessage = (
    message: SecretLintJsonMessage
): SerializableSecretlintMessage => ({
    column: message.loc?.start?.column ?? 1,
    ...(typeof message.loc?.end?.column === "number" && {
        endColumn: message.loc.end.column,
    }),
    ...(typeof message.loc?.end?.line === "number" && {
        endLine: message.loc.end.line,
    }),
    line: message.loc?.start?.line ?? 1,
    message: message.message ?? "Secretlint reported a problem.",
    ...(typeof message.messageId === "string" && {
        messageId: message.messageId,
    }),
    ruleId: message.ruleId ?? "secretlint",
    severity: message.severity ?? "error",
});

const runSecretlint = async (
    request: SecretlintWorkerRequest
): Promise<SerializableSecretlintResult> => {
    const options = request.options;
    const result = await runSecretLint({
        cliOptions: {
            cwd: options.cwd ?? process.cwd(),
            stdinContent: options.code,
            stdinFileName: options.codeFilename,
            ...(isDefined(options.ignoreFile) && {
                ignoreFilePath: options.ignoreFile,
            }),
            ...(isDefined(options.respectGitignore) && {
                respectGitignore: options.respectGitignore,
            }),
        },
        engineOptions: {
            color: false,
            cwd: options.cwd ?? process.cwd(),
            formatter: "json",
            maskSecrets: options.maskSecrets ?? true,
            terminalLink: false,
            ...(isDefined(options.configFile) && {
                configFilePath: options.configFile,
            }),
            ...(isDefined(options.locale) && { locale: options.locale }),
        },
    });
    if (isDefined(result.stderr)) throw result.stderr;
    const parsed = safeCastTo<readonly SecretLintJsonResult[]>(
        JSON.parse(result.stdout ?? "[]")
    );
    return {
        messages: parsed.flatMap((entry) =>
            (entry.messages ?? []).map((message) =>
                toSerializableMessage(message)
            )
        ),
    };
};

const notifyCompletion = (
    request: SecretlintWorkerRequest,
    response: SecretlintWorkerResponse
): void => {
    request.port.postMessage(response);
    request.port.close();
    const signal = new Int32Array(request.signalBuffer);
    Atomics.store(signal, 0, DONE_STATE);
    Atomics.notify(signal, 0);
};

const handleRequest = async (
    request: SecretlintWorkerRequest
): Promise<void> => {
    try {
        notifyCompletion(request, {
            ok: true,
            result: await runSecretlint(request),
        });
    } catch (error: unknown) {
        const normalizedError =
            error instanceof Error
                ? {
                      message: error.message,
                      name: error.name,
                      ...(isDefined(error.stack) && { stack: error.stack }),
                  }
                : {
                      message: `Unknown Secretlint worker failure: ${String(error)}`,
                      name: "SecretlintWorkerError",
                  };
        notifyCompletion(request, { error: normalizedError, ok: false });
    }
};

if (!isMainThread) {
    const onMessage = (request: SecretlintWorkerRequest): void => {
        void handleRequest(request);
    };
    const removeOnExit = (): void => {
        parentPort?.off("message", onMessage);
    };
    parentPort?.on("message", onMessage);
    process.once("exit", removeOnExit);
}
