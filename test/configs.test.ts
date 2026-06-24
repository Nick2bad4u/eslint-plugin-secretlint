import type { Linter } from "eslint";

import { describe, expect, it } from "vitest";

import { secretlintConfigNames } from "../src/_internal/secretlint-config-references";
import secretlintPlugin, { type SecretlintConfig } from "../src/plugin";

const toNameSet = (values: Iterable<string>): ReadonlySet<string> =>
    new Set(values);

const isConfigArray = (
    config: SecretlintConfig
): config is readonly Linter.Config[] => Array.isArray(config);

const enabledRules = (configName: "all" | "recommended"): readonly string[] =>
    (isConfigArray(secretlintPlugin.configs[configName])
        ? secretlintPlugin.configs[configName]
        : [secretlintPlugin.configs[configName]]
    ).flatMap((config) => Object.keys(config.rules ?? {}));

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
});
