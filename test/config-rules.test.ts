import type { RuleTester } from "@typescript-eslint/rule-tester";

import { ESLint, type Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { hasConfigProperty } from "../src/_internal/config-rule-factories";
import { rawTextParser } from "../src/_internal/raw-text-parser";
import { isSecretlintConfigReference } from "../src/_internal/secretlint-config-references";
import secretlintPlugin from "../src/plugin";

type RawParserResult = Readonly<{
    ast: Readonly<{
        loc?: { end: { column: number; line: number } };
        range?: readonly [number, number];
        type: string;
    }>;
}>;
type RawParserWithParseForEslint = Readonly<{
    parseForESLint: (text: string) => RawParserResult;
}>;
type RuleWithDocs = Parameters<RuleTester["run"]>[1] & {
    meta: {
        docs: {
            url: string;
        };
    };
};

const isRuleModule = (value: unknown): value is RuleWithDocs =>
    typeof value === "object" &&
    value !== null &&
    typeof (value as { create?: unknown }).create === "function" &&
    typeof (value as { meta?: { docs?: { url?: unknown } } }).meta?.docs
        ?.url === "string";
const hasParseForEslint = (
    parser: Linter.Parser
): parser is Linter.Parser & RawParserWithParseForEslint =>
    "parseForESLint" in parser && typeof parser.parseForESLint === "function";
const requireParseForEslint = (
    parser: Linter.Parser
): RawParserWithParseForEslint => {
    if (hasParseForEslint(parser)) return parser;
    throw new TypeError("Expected raw text parser to expose parseForESLint.");
};

const configRules = secretlintPlugin.configs.configuration as Linter.Config;
const createConfigRuleEngine = (): ESLint =>
    new ESLint({
        overrideConfig: [
            {
                ...configRules,
                files: ["**/*.{js,cjs,mjs,json,jsonc,yml,yaml}"],
            },
        ],
        overrideConfigFile: true,
    });

describe("secretlint config rules", () => {
    it("registers config-authoring rules with docs metadata", () => {
        expect.hasAssertions();
        expect(isRuleModule({})).not.toBe(true);

        for (const [name, rule] of Object.entries(secretlintPlugin.rules)) {
            if (!isRuleModule(rule)) {
                throw new TypeError(
                    `${name} is not a rule module with docs metadata.`
                );
            }

            expect(rule.meta.docs.url).toContain("/docs/rules/");
        }
    });

    it("detects Secretlint config properties across supported syntaxes", () => {
        expect.assertions(5);

        expect(hasConfigProperty("rules:\n  - id: example\n", "rules")).toBe(
            true
        );
        expect(
            hasConfigProperty(
                'module.exports = { rules: [{ id: "example" }] };',
                "rules"
            )
        ).toBe(true);
        expect(hasConfigProperty('{ "rules": [] }', "rules")).toBe(true);
        expect(hasConfigProperty("filters: []\n", "rules")).toBe(false);
        expect(hasConfigProperty("config.rules: []", "rules")).toBe(false);
    });

    it("identifies supported Secretlint config references", () => {
        expect.assertions(2);

        expect(
            isSecretlintConfigReference("secretlint.configs.recommended")
        ).toBe(true);
        expect(isSecretlintConfigReference("secretlint.configs.missing")).toBe(
            false
        );
    });

    it("reports config-authoring problems through the configuration preset", async () => {
        expect.assertions(6);

        const eslint = createConfigRuleEngine();
        const [result] = await eslint.lintText(
            'module.exports = { rules: [{ id: "" }] };\n',
            { filePath: "wrong-name.cjs" }
        );

        const messages = result?.messages ?? [];
        const ruleIds = new Set(messages.map((message) => message.ruleId));

        expect(ruleIds).toContain(
            "secretlint/disallow-secretlint-empty-rule-id"
        );
        expect(ruleIds).toContain(
            "secretlint/require-secretlint-config-file-naming-convention"
        );
        expect(ruleIds).not.toContain(
            "secretlint/require-secretlint-rules-array"
        );
        expect(messages.some((message) => message.line === 1)).toBe(true);
        expect(messages.map((message) => message.severity)).toStrictEqual(
            expect.arrayContaining([1])
        );
        expect(messages.map((message) => message.message)).toStrictEqual(
            expect.arrayContaining([
                expect.stringContaining("Expected config string values"),
            ])
        );
    });

    it("accepts valid Secretlint config files", async () => {
        expect.assertions(1);

        const eslint = createConfigRuleEngine();
        const [result] = await eslint.lintText(
            'module.exports = { rules: [{ id: "local-rule" }] };\n',
            { filePath: ".secretlintrc.cjs" }
        );

        expect(result?.messages).toHaveLength(0);
    });

    it("parses raw text with stable source locations", () => {
        expect.assertions(5);

        const parser = requireParseForEslint(rawTextParser);
        const result = parser.parseForESLint("one\r\ntwo\n\u{2029}three");

        expect(result?.ast.type).toBe("Program");
        expect(result?.ast.range).toStrictEqual([0, 15]);
        expect(result?.ast.loc?.end).toStrictEqual({ column: 5, line: 4 });

        const standaloneCarriageReturn = parser.parseForESLint("one\rtwo").ast;

        expect(standaloneCarriageReturn.range).toStrictEqual([0, 7]);
        expect(standaloneCarriageReturn.loc?.end).toStrictEqual({
            column: 3,
            line: 2,
        });
    });
});
