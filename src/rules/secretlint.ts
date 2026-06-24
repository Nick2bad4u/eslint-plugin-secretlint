import { isDefined } from "ts-extras";

import { runSecretlintSynchronously } from "../_internal/secretlint-runner.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "../_internal/typed-rule.js";

type MessageIds = "secretlintConfigError" | "secretlintProblem";
type Options = [SecretlintRuleOption?];
type ReportLocation = Readonly<{
    end: { column: number; line: number };
    start: { column: number; line: number };
}>;

type SecretlintRuleOption = Readonly<{
    configFile?: string;
    ignoreFile?: string;
    locale?: string;
    maskSecrets?: boolean;
    respectGitignore?: boolean;
    timeoutMs?: number;
}>;

const toEslintLoc = (
    message: Readonly<{
        column: number;
        endColumn?: number;
        endLine?: number;
        line: number;
    }>
): ReportLocation => ({
    end: {
        column: Math.max((message.endColumn ?? message.column + 1) - 1, 0),
        line: message.endLine ?? message.line,
    },
    start: {
        column: Math.max(message.column - 1, 0),
        line: message.line,
    },
});

const secretlintRule: RuleModuleWithDocs<MessageIds, Options> = createTypedRule<
    MessageIds,
    Options
>({
    create: (context, [rawOptions = {}]) =>
        toRuleListener({
            Program() {
                let lintResult: ReturnType<typeof runSecretlintSynchronously>;
                try {
                    lintResult = runSecretlintSynchronously({
                        code: context.sourceCode.text,
                        codeFilename: context.physicalFilename,
                        cwd: context.cwd,
                        ...(isDefined(rawOptions.configFile) && {
                            configFile: rawOptions.configFile,
                        }),
                        ...(isDefined(rawOptions.ignoreFile) && {
                            ignoreFile: rawOptions.ignoreFile,
                        }),
                        ...(isDefined(rawOptions.locale) && {
                            locale: rawOptions.locale,
                        }),
                        ...(isDefined(rawOptions.maskSecrets) && {
                            maskSecrets: rawOptions.maskSecrets,
                        }),
                        ...(isDefined(rawOptions.respectGitignore) && {
                            respectGitignore: rawOptions.respectGitignore,
                        }),
                        ...(isDefined(rawOptions.timeoutMs) && {
                            timeoutMs: rawOptions.timeoutMs,
                        }),
                    });
                } catch (error: unknown) {
                    context.report({
                        data: {
                            message:
                                error instanceof Error
                                    ? error.message
                                    : String(error),
                        },
                        loc: {
                            end: { column: 0, line: 1 },
                            start: { column: 0, line: 1 },
                        },
                        messageId: "secretlintConfigError",
                        node: context.sourceCode.ast,
                    });
                    return;
                }
                for (const message of lintResult.messages) {
                    context.report({
                        data: { rule: message.ruleId, text: message.message },
                        loc: toEslintLoc(message),
                        messageId: "secretlintProblem",
                        node: context.sourceCode.ast,
                    });
                }
            },
        }),
    meta: {
        defaultOptions: [{}],
        deprecated: false,
        docs: {
            configs: [
                "secretlint.configs.recommended",
                "secretlint.configs.secretlintOnly",
                "secretlint.configs.all",
            ],
            description: "run Secretlint against text files from ESLint.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/secretlint",
        },
        messages: {
            secretlintConfigError:
                "Secretlint configuration error: {{message}}",
            secretlintProblem: "Secretlint ({{rule}}): {{text}}",
        },
        schema: [{ additionalProperties: true, type: "object" }],
        type: "problem",
    },
    name: "secretlint",
});

export default secretlintRule;
