import { ESLint, type Linter } from "eslint";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";

import secretlintPlugin, { type SecretlintConfig } from "../src/plugin";

const isConfigArray = (
    config: SecretlintConfig
): config is readonly Linter.Config[] => Array.isArray(config);
const toConfigArray = (config: SecretlintConfig): readonly Linter.Config[] =>
    isConfigArray(config) ? config : [config];
const bridgeConfigs = toConfigArray(secretlintPlugin.configs.secretlintOnly);
const fixturesDirectory = fileURLToPath(
    new URL("fixtures/bridge/", import.meta.url)
);

const usingTemporaryDirectory = async <Result>(
    prefix: string,
    callback: (temporaryDirectory: string) => Promise<Result>
): Promise<Result> => {
    const temporaryDirectory = mkdtempSync(path.join(tmpdir(), prefix));
    try {
        return await callback(temporaryDirectory);
    } finally {
        rmSync(temporaryDirectory, { force: true, recursive: true });
    }
};
const createEngine = (
    ruleOptions: Readonly<Record<string, unknown>> = {},
    cwd?: string
): ESLint =>
    new ESLint({
        ...(cwd !== undefined && { cwd }),
        overrideConfig: [
            ...bridgeConfigs,
            {
                files: ["**/*"],
                rules: {
                    "secretlint/secretlint": ["error", ruleOptions],
                },
            },
        ],
        overrideConfigFile: true,
    });

describe("secretlint bridge rule", () => {
    it("accepts clean text files without diagnostics", async () => {
        expect.assertions(1);

        await usingTemporaryDirectory(
            "secretlint-bridge-clean-",
            async (temporaryDirectory) => {
                const configPath = path.join(
                    temporaryDirectory,
                    ".secretlintrc.cjs"
                );
                const ignorePath = path.join(
                    temporaryDirectory,
                    ".secretlintignore"
                );
                writeFileSync(configPath, "module.exports = { rules: [] };\n");
                writeFileSync(ignorePath, "\n");
                const eslint = createEngine({
                    configFile: configPath,
                    ignoreFile: ignorePath,
                    locale: "en",
                    maskSecrets: false,
                    respectGitignore: false,
                    timeoutMs: 30_000,
                });
                const [result] = await eslint.lintText("hello world\n", {
                    filePath: "sample.txt",
                });

                expect(result?.messages).toHaveLength(0);
            }
        );
    }, 30_000);

    it("lints text fixture files from disk with forwarded options", async () => {
        expect.assertions(3);

        const eslint = createEngine(
            {
                configFile: path.join(fixturesDirectory, ".secretlintrc.cjs"),
                ignoreFile: path.join(fixturesDirectory, ".secretlintignore"),
                locale: "en",
                maskSecrets: false,
                respectGitignore: false,
                timeoutMs: 30_000,
            },
            fixturesDirectory
        );
        const results = await eslint.lintFiles(["clean.txt", "leaky.env"]);
        const messagesByBasename = new Map(
            results.map((result) => [
                path.basename(result.filePath),
                result.messages,
            ])
        );
        const leakyMessages = messagesByBasename.get("leaky.env") ?? [];

        expect(messagesByBasename.get("clean.txt")).toHaveLength(0);
        expect(leakyMessages.length).toBeGreaterThan(0);
        expect(leakyMessages[0]).toMatchObject({
            messageId: "secretlintProblem",
            ruleId: "secretlint/secretlint",
        });
    }, 30_000);

    it("reports Secretlint diagnostics through ESLint", async () => {
        expect.assertions(4);

        await usingTemporaryDirectory(
            "secretlint-bridge-",
            async (temporaryDirectory) => {
                const configPath = path.join(
                    temporaryDirectory,
                    ".secretlintrc.cjs"
                );
                writeFileSync(
                    configPath,
                    'module.exports = { rules: [{ id: "@secretlint/secretlint-rule-pattern", options: { patterns: [{ name: "Fixture secret", pattern: "/fixture-secret-[A-Za-z0-9]{20,}/" }] } }] };\n'
                );
                const eslint = createEngine({ configFile: configPath });
                const [result] = await eslint.lintText(
                    "TOKEN=fixture-secret-testtesttesttesttesttesttesttest\n",
                    {
                        filePath: "sample.env",
                    }
                );

                expect(result?.messages).not.toHaveLength(0);
                expect(result?.messages[0]?.ruleId).toBe(
                    "secretlint/secretlint"
                );
                expect(result?.messages[0]?.messageId).toBe(
                    "secretlintProblem"
                );
                expect(result?.messages[0]?.message).toStrictEqual(
                    expect.any(String)
                );
            }
        );
    }, 30_000);

    it("reports serialized Secretlint runner messages with locations", async () => {
        expect.assertions(4);

        vi.resetModules();
        vi.doMock(import("../src/_internal/secretlint-runner.js"), () => ({
            runSecretlintSynchronously: () => ({
                messages: [
                    {
                        column: 1,
                        endColumn: 6,
                        endLine: 1,
                        line: 1,
                        message: "mock secret found",
                        ruleId: "mock-secret",
                        severity: "error",
                    },
                ],
            }),
        }));
        const { default: mockedSecretlintPlugin } =
            await import("../src/plugin");
        const mockedBridgeConfigs = toConfigArray(
            mockedSecretlintPlugin.configs.secretlintOnly
        );
        const eslint = new ESLint({
            overrideConfig: [
                ...mockedBridgeConfigs,
                {
                    files: ["**/*"],
                    rules: {
                        "secretlint/secretlint": "error",
                    },
                },
            ],
            overrideConfigFile: true,
        });
        const [result] = await eslint.lintText("secret\n", {
            filePath: "sample.txt",
        });

        vi.doUnmock(import("../src/_internal/secretlint-runner.js"));

        expect(result?.messages[0]?.message).toContain("mock secret found");
        expect(result?.messages[0]?.line).toBe(1);
        expect(result?.messages[0]?.column).toBe(1);
        expect(result?.messages[0]?.endColumn).toBe(6);
    });

    it("reports Secretlint execution failures as configuration errors", async () => {
        expect.assertions(2);

        const eslint = createEngine({
            configFile: "missing-secretlint-config.cjs",
        });
        const [result] = await eslint.lintText("hello world\n", {
            filePath: "sample.txt",
        });

        expect(result?.messages[0]?.ruleId).toBe("secretlint/secretlint");
        expect(result?.messages[0]?.message).toContain(
            "Secretlint configuration error"
        );
    }, 30_000);
});
