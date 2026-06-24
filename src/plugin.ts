import type { ESLint, Linter } from "eslint";

import tsParser from "@typescript-eslint/parser";

// eslint-disable-next-line import-x/extensions -- Node JSON import attributes require the file extension at runtime.
import packageJson from "../package.json" with { type: "json" };
import { rawTextParser } from "./_internal/raw-text-parser.js";
import { secretlintRules } from "./_internal/rules-registry.js";
import {
    type SecretlintConfigName as InternalSecretlintConfigName,
    secretlintConfigMetadataByName,
} from "./_internal/secretlint-config-references.js";

export type SecretlintConfigName = InternalSecretlintConfigName;

const pluginName = "eslint-plugin-secretlint" as const;
const pluginNamespace = "secretlint" as const;
const bridgeFiles = [
    "**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts,json,jsonc,yml,yaml,md,mdx,txt,env,ini,toml,xml,html,css,scss,sass}",
] as const;
const configFiles = [
    "**/.secretlintrc.{json,jsonc,yml,yaml,js,cjs,mjs}",
    "**/secretlint.config.{js,cjs,mjs}",
] as const;

export type SecretlintConfig = Linter.Config | readonly Linter.Config[];
export type SecretlintConfigs = Record<SecretlintConfigName, SecretlintConfig>;
export type SecretlintRuleId = `secretlint/${SecretlintRuleName}`;
export type SecretlintRuleName = keyof typeof secretlintRules;
type FlatConfigRules = NonNullable<Linter.Config["rules"]>;

const eslintPluginRules: typeof secretlintRules = secretlintRules;
const version =
    typeof packageJson.version === "string" ? packageJson.version : "0.0.0";

const secretlintPlugin: {
    configs: SecretlintConfigs;
    meta: { name: string; namespace: string; version: string };
    processors: NonNullable<ESLint.Plugin["processors"]>;
    rules: typeof eslintPluginRules;
} = {
    configs: {
        all: [],
        configs: {},
        configuration: {},
        recommended: [],
        secretlintOnly: {},
        text: {},
    },
    meta: { name: pluginName, namespace: pluginNamespace, version },
    processors: {},
    rules: eslintPluginRules,
};
const secretlintPluginForEslint =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- ESLint's public Plugin type requires mutable option/config arrays, while this package exposes readonly typed rule metadata internally.
    secretlintPlugin as unknown as ESLint.Plugin;

const secretlintOnlyPreset: Linter.Config = {
    files: [...bridgeFiles],
    ignores: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/coverage/**",
        "**/.cache/**",
        "**/docs/docusaurus/build/**",
        "**/docs/docusaurus/.docusaurus/**",
    ],
    languageOptions: { parser: rawTextParser },
    name: secretlintConfigMetadataByName.secretlintOnly.presetName,
    plugins: { [pluginNamespace]: secretlintPluginForEslint },
    rules: { "secretlint/secretlint": "error" },
};

const configurationRules = {
    "secretlint/disallow-secretlint-duplicate-rules": "warn",
    "secretlint/disallow-secretlint-empty-rule-id": "warn",
    "secretlint/disallow-secretlint-relative-rule-paths": "warn",
    "secretlint/disallow-secretlint-unknown-rule-properties": "warn",
    "secretlint/prefer-secretlint-allow-message-ids-array": "warn",
    "secretlint/prefer-secretlint-nested-rules-array": "warn",
    "secretlint/require-secretlint-config-file-naming-convention": "warn",
    "secretlint/require-secretlint-rule-id": "warn",
    "secretlint/require-secretlint-rules-array": "warn",
    "secretlint/require-secretlint-rules-packages-installed": "warn",
} as const satisfies FlatConfigRules;

const recommendedConfigurationRules = {
    "secretlint/disallow-secretlint-duplicate-rules": "warn",
    "secretlint/disallow-secretlint-empty-rule-id": "warn",
    "secretlint/disallow-secretlint-relative-rule-paths": "warn",
    "secretlint/require-secretlint-config-file-naming-convention": "warn",
    "secretlint/require-secretlint-rule-id": "warn",
    "secretlint/require-secretlint-rules-array": "warn",
} as const satisfies FlatConfigRules;

const configurationPreset: Linter.Config = {
    files: [...configFiles],
    languageOptions: {
        parser: tsParser,
        parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    name: secretlintConfigMetadataByName.configuration.presetName,
    plugins: { [pluginNamespace]: secretlintPluginForEslint },
    rules: configurationRules,
};

const recommendedConfigurationPreset: Linter.Config = {
    ...configurationPreset,
    name: secretlintConfigMetadataByName.recommended.presetName,
    rules: recommendedConfigurationRules,
};

secretlintPlugin.configs = {
    all: [secretlintOnlyPreset, configurationPreset],
    configs: configurationPreset,
    configuration: configurationPreset,
    recommended: [secretlintOnlyPreset, recommendedConfigurationPreset],
    secretlintOnly: secretlintOnlyPreset,
    text: secretlintOnlyPreset,
};

export type SecretlintPlugin = typeof secretlintPlugin;
export default secretlintPlugin;
