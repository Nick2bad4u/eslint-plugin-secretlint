import type { MessagePort } from "node:worker_threads";

/**
 * SecretlintWorkerErrorResponse secretlint worker error response contract.
 */
export type SecretlintWorkerErrorResponse = Readonly<{
    error: Readonly<{ message: string; name: string; stack?: string }>;
    ok: false;
}>;

/**
 * SecretlintWorkerRequest secretlint worker request contract.
 */
export type SecretlintWorkerRequest = Readonly<{
    options: SerializableSecretlintLintOptions;
    port: MessagePort;
    signalBuffer: SharedArrayBuffer;
}>;

/**
 * SecretlintWorkerResponse secretlint worker response contract.
 */
export type SecretlintWorkerResponse =
    | SecretlintWorkerErrorResponse
    | SecretlintWorkerSuccessResponse;
/**
 * SecretlintWorkerSuccessResponse secretlint worker success response contract.
 */
export type SecretlintWorkerSuccessResponse = Readonly<{
    ok: true;
    result: SerializableSecretlintResult;
}>;
/**
 * SerializableSecretlintLintOptions serializable secretlint lint options
 * contract.
 */
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
/**
 * SerializableSecretlintMessage serializable secretlint message contract.
 */
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
/**
 * SerializableSecretlintResult serializable secretlint result contract.
 */
export type SerializableSecretlintResult = Readonly<{
    messages: readonly SerializableSecretlintMessage[];
}>;
