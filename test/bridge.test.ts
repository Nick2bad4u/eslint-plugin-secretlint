import { ESLint, type Linter } from "eslint";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import secretlintPlugin from "../src/plugin";

const bridgeConfig = secretlintPlugin.configs.secretlintOnly as Linter.Config;

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
    ruleOptions: Readonly<Record<string, unknown>> = {}
): ESLint =>
    new ESLint({
        overrideConfig: [
            {
                ...bridgeConfig,
                rules: {
                    "secretlint/secretlint": ["error", ruleOptions],
                },
            },
        ],
        overrideConfigFile: true,
    });

describe("secretlint bridge rule", () => {
    it("reports Secretlint diagnostics through ESLint", async () => {
        expect.assertions(3);

        await usingTemporaryDirectory(
            "secretlint-bridge-",
            async (temporaryDirectory) => {
                const configPath = path.join(
                    temporaryDirectory,
                    ".secretlintrc.cjs"
                );
                writeFileSync(
                    configPath,
                    'module.exports = { rules: [{ id: "@secretlint/secretlint-rule-pattern", options: { patterns: [{ name: "OpenAI", pattern: "/sk-[A-Za-z0-9]{20,}/" }] } }] };\n'
                );
                const eslint = createEngine({ configFile: configPath });
                const [result] = await eslint.lintText(
                    "OPENAI_API_KEY=sk-testtesttesttesttesttesttesttesttesttesttesttest\n",
                    {
                        filePath: "sample.env",
                    }
                );

                expect(result?.messages).not.toHaveLength(0);
                expect(result?.messages[0]?.ruleId).toBe(
                    "secretlint/secretlint"
                );
                expect(result?.messages[0]?.message).toStrictEqual(
                    expect.any(String)
                );
            }
        );
    }, 30_000);
});
