import tsParser from "@typescript-eslint/parser";
import { ESLint, type Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { secretlintConfigNames } from "../src/_internal/secretlint-config-references";
import secretlintPlugin, { type SecretlintConfig } from "../src/plugin";

const toNameSet = (values: Iterable<string>): ReadonlySet<string> =>
    new Set(values);

const isConfigArray = (
    config: SecretlintConfig
): config is readonly Linter.Config[] => Array.isArray(config);
const requireConfigArray = (
    config: SecretlintConfig,
    configName: string
): readonly Linter.Config[] => {
    if (isConfigArray(config)) return config;
    throw new TypeError(`Expected ${configName} to be an array.`);
};

const enabledRules = (configName: "all" | "recommended"): readonly string[] =>
    (isConfigArray(secretlintPlugin.configs[configName])
        ? secretlintPlugin.configs[configName]
        : [secretlintPlugin.configs[configName]]
    ).flatMap((config) => Object.keys(config.rules ?? {}));
const calculateConfigForFile = async (
    eslint: ESLint,
    filePath: string
): Promise<Linter.Config | undefined> => {
    const config: unknown = await eslint.calculateConfigForFile(filePath);
    return config as Linter.Config | undefined;
};
const parserName = (config: Linter.Config | undefined): string | undefined => {
    const parser = config?.languageOptions?.["parser"];
    if (typeof parser !== "object" || parser === null || !("meta" in parser)) {
        return undefined;
    }
    const meta = parser.meta as { name?: unknown };
    return typeof meta.name === "string" ? meta.name : undefined;
};
const ruleSeverities = new Set<unknown>([
    0,
    1,
    2,
    "error",
    "off",
    "warn",
]);
const isRuleSeverity = (value: unknown): value is Linter.RuleSeverity =>
    ruleSeverities.has(value);
const ruleSeverity = (rule: unknown): Linter.RuleSeverity | undefined => {
    const severity = Array.isArray(rule) ? rule[0] : rule;
    return isRuleSeverity(severity) ? severity : undefined;
};

describe("secretlint plugin configs", () => {
    it("exports exactly the supported config keys", () => {
        expect.assertions(1);

        expect(toNameSet(Object.keys(secretlintPlugin.configs))).toStrictEqual(
            toNameSet(secretlintConfigNames)
        );
    });

    it("keeps aliases wired to preferred preset names", () => {
        expect.assertions(2);

        expect(secretlintPlugin.configs.text).toBe(
            secretlintPlugin.configs.secretlintOnly
        );
        expect(secretlintPlugin.configs.configs).toBe(
            secretlintPlugin.configs.configuration
        );
    });

    it("keeps recommended narrower than all", () => {
        expect.assertions(4);

        expect(toNameSet(enabledRules("recommended"))).toStrictEqual(
            toNameSet([
                "secretlint/disallow-secretlint-duplicate-rules",
                "secretlint/disallow-secretlint-empty-rule-id",
                "secretlint/disallow-secretlint-relative-rule-paths",
                "secretlint/require-secretlint-config-file-naming-convention",
                "secretlint/require-secretlint-rule-id",
                "secretlint/require-secretlint-rules-array",
                "secretlint/secretlint",
            ])
        );
        expect(enabledRules("all")).toContain(
            "secretlint/disallow-secretlint-unknown-rule-properties"
        );
        expect(enabledRules("all")).toContain(
            "secretlint/require-secretlint-rules-packages-installed"
        );
        expect(enabledRules("recommended")).not.toContain(
            "secretlint/require-secretlint-rules-packages-installed"
        );
    });

    it("keeps parser-neutral bridge rules from replacing upstream parsers", async () => {
        expect.assertions(4);

        const allConfig = requireConfigArray(
            secretlintPlugin.configs.all,
            "secretlint.configs.all"
        );

        const eslint = new ESLint({
            overrideConfig: [
                {
                    files: ["**/*.{js,mjs,ts,tsx}"],
                    languageOptions: { parser: tsParser },
                },
                ...allConfig,
            ],
            overrideConfigFile: true,
        });
        const sourceConfig = await calculateConfigForFile(
            eslint,
            "src/plugin.ts"
        );
        const rawTextConfig = await calculateConfigForFile(
            eslint,
            "sample.env"
        );

        expect(parserName(sourceConfig)).toBe("typescript-eslint/parser");
        expect(
            ruleSeverity(sourceConfig?.rules?.["secretlint/secretlint"])
        ).toBe(2);
        expect(parserName(rawTextConfig)).toBe(
            "eslint-plugin-secretlint/raw-text-parser"
        );
        expect(
            ruleSeverity(rawTextConfig?.rules?.["secretlint/secretlint"])
        ).toBe(2);
    });
});
