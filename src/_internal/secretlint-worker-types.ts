import type { MessagePort } from "node:worker_threads";

export type SecretlintWorkerErrorResponse = Readonly<{
    error: Readonly<{ message: string; name: string; stack?: string }>;
    ok: false;
}>;

export type SecretlintWorkerRequest = Readonly<{
    options: SerializableSecretlintLintOptions;
    port: MessagePort;
    signalBuffer: SharedArrayBuffer;
}>;

export type SecretlintWorkerResponse =
    | SecretlintWorkerErrorResponse
    | SecretlintWorkerSuccessResponse;
export type SecretlintWorkerSuccessResponse = Readonly<{
    ok: true;
    result: SerializableSecretlintResult;
}>;
export type SerializableSecretlintLintOptions = Readonly<{
    code: string;
    codeFilename: string;
    configFile?: string;
    cwd?: string;
    ignoreFile?: string;
    locale?: string;
    maskSecrets?: boolean;
    respectGitignore?: boolean;
    timeoutMs?: number;
}>;
export type SerializableSecretlintMessage = Readonly<{
    column: number;
    endColumn?: number;
    endLine?: number;
    line: number;
    message: string;
    messageId?: string;
    ruleId: string;
    severity: string;
}>;
export type SerializableSecretlintResult = Readonly<{
    messages: readonly SerializableSecretlintMessage[];
}>;
