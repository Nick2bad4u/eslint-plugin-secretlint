import type { JsonObject } from "type-fest";

import { isMainThread, parentPort } from "node:worker_threads";
import { runSecretLint } from "secretlint";
import { isDefined } from "ts-extras";

import type {
    SecretlintWorkerRequest,
    SecretlintWorkerResponse,
    SerializableSecretlintMessage,
    SerializableSecretlintResult,
} from "./secretlint-worker-types.js";

const DONE_STATE = 1 as const;

type JsonRecord = Readonly<JsonObject>;

const isJsonRecord = (value: unknown): value is JsonRecord =>
    typeof value === "object" && value !== null;

const toJsonRecord = (value: unknown): JsonRecord =>
    isJsonRecord(value) ? value : {};

const toSerializableMessage = (
    message: JsonRecord
): SerializableSecretlintMessage => {
    const loc = toJsonRecord(message["loc"]);
    const start = toJsonRecord(loc["start"]);
    const end = toJsonRecord(loc["end"]);
    const column = start["column"];
    const endColumn = end["column"];
    const endLine = end["line"];
    const line = start["line"];
    const messageText = message["message"];
    const messageId = message["messageId"];
    const ruleId = message["ruleId"];
    const severity = message["severity"];
    return {
        column: typeof column === "number" ? column : 1,
        ...(typeof endColumn === "number" && {
            endColumn,
        }),
        ...(typeof endLine === "number" && {
            endLine,
        }),
        line: typeof line === "number" ? line : 1,
        message:
            typeof messageText === "string"
                ? messageText
                : "Secretlint reported a problem.",
        ...(typeof messageId === "string" && {
            messageId,
        }),
        ruleId: typeof ruleId === "string" ? ruleId : "secretlint",
        severity: typeof severity === "string" ? severity : "error",
    };
};

const parseSecretlintOutput = (
    stdout: null | string | undefined
): SerializableSecretlintMessage[] => {
    const parsedJson: unknown = JSON.parse(stdout ?? "[]");
    if (!Array.isArray(parsedJson)) return [];
    return parsedJson.filter(isJsonRecord).flatMap((entry) => {
        const messages = entry["messages"];
        return Array.isArray(messages)
            ? messages
                  .filter(isJsonRecord)
                  .map((message) => toSerializableMessage(message))
            : [];
    });
};

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
    if (result.stderr instanceof Error) throw result.stderr;
    return {
        messages: parseSecretlintOutput(result.stdout),
    };
};

const notifyCompletion = (
    request: SecretlintWorkerRequest,
    response: SecretlintWorkerResponse
): void => {
    // eslint-disable-next-line unicorn/require-post-message-target-origin -- MessagePort from node:worker_threads has no browser targetOrigin parameter.
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
