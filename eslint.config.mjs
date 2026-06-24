import { createConfig } from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

const secretlintPlugin =
    /** @type {import("./src/plugin").SecretlintPlugin} */ (plugin);
const configurationPreset = secretlintPlugin.configs.configuration;
if (Array.isArray(configurationPreset))
    throw new TypeError(
        "Expected secretlint.configs.configuration to be a flat config object."
    );

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...createConfig({
        allowDefaultProjectFilePatterns: [
            "eslint.config.mjs",
            "prettier.config.mjs",
            "stylelint.config.mjs",
        ],
        plugins: { secretlint: false },
    }),
    {
        ignores: [
            ".github/workflows/**",
            "dist/**",
            "coverage/**",
            ".cache/**",
            "docs/docusaurus/**",
            "eslint.config.mjs",
            "knip.config.ts",
            "plugin.*",
            "test/**/*.test-d.ts",
            "untyped-third-party-modules.d.ts",
            "vite.config.ts",
        ],
    },
    { ...configurationPreset, name: "Local Secretlint config rules" },
    {
        files: ["src/**/*.ts"],
        rules: {
            "perfectionist/sort-modules": "off",
            "perfectionist/sort-objects": "off",
            "perfectionist/sort-union-types": "off",
            "tsdoc-require-2/require": "off",
            "typefest/prefer-type-fest-except": "off",
            "typedoc/require-exported-doc-comment": "off",
        },
    },
    {
        files: ["src/_internal/**/*.ts"],
        rules: {
            "@typescript-eslint/only-throw-error": "off",
            "etc-misc/no-vulnerable": "off",
            "etc-misc/throw-error": "off",
            "import-x/max-dependencies": "off",
            "no-duplicate-imports": "off",
            "no-empty": "off",
            "prefer-named-capture-group": "off",
            "regexp/no-super-linear-move": "off",
            "regexp/prefer-named-capture-group": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "sdl/no-postmessage-without-origin-allowlist": "off",
            "typefest/prefer-ts-extras-array-includes": "off",
            "typefest/prefer-ts-extras-key-in": "off",
            "typefest/prefer-ts-extras-set-has": "off",
            "unicorn/import-style": "off",
            "unicorn/no-error-property-assignment": "off",
            "unicorn/no-top-level-assignment-in-function": "off",
            "unicorn/prefer-includes-over-repeated-comparisons": "off",
            "unicorn/require-post-message-target-origin": "off",
            "unicorn/try-complexity": "off",
        },
    },
    {
        files: [
            "src/_internal/secretlint-worker.ts",
            "src/_internal/secretlint-runner.ts",
            "src/rules/secretlint.ts",
        ],
        rules: {
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "n/no-sync": "off",
            "security/detect-non-literal-fs-filename": "off",
            "unicorn/no-process-exit": "off",
        },
    },
    {
        files: ["src/rules/**/*.ts"],
        rules: {
            "eslint-plugin/require-meta-docs-description": "off",
            "eslint-plugin/require-meta-schema-description": "off",
            "prefer-named-capture-group": "off",
            "regexp/prefer-named-capture-group": "off",
            "unicorn/try-complexity": "off",
        },
    },
    {
        files: ["test/**/*.test.ts", "test/_internal/**/*.ts"],
        rules: {
            "canonical/no-use-extend-native": "off",
            "no-template-curly-in-string": "off",
            "test-signal/no-weak-existence-assertions": "off",
            "test-signal/no-weak-truthy-assertions": "off",
            "test-signal/require-negative-path": "off",
            "tsdoc-require-2/require": "off",
            "unicorn/import-style": "off",
            "unicorn/no-top-level-side-effects": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/require-array-sort-compare": "off",
            "vitest/no-hooks": "off",
            "vitest/prefer-expect-assertions": "off",
            "vitest/require-top-level-describe": "off",
        },
    },
];
export default config;
