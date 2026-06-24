import { ESLint, type Linter } from "eslint";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import secretlintPlugin from "../src/plugin";

const bridgeConfig = secretlintPlugin.configs.secretlintOnly as Linter.Config;
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
        expect.hasAssertions();

        const temporaryDirectory = mkdtempSync(
            path.join(tmpdir(), "secretlint-bridge-")
        );
        try {
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

            expect(result).toBeDefined();
            expect(result!.messages.length).toBeGreaterThan(0);
            expect(result!.messages[0]?.ruleId).toBe("secretlint/secretlint");
        } finally {
            rmSync(temporaryDirectory, { force: true, recursive: true });
        }
    }, 30_000);
});
