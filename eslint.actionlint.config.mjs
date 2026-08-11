import actionlint from "eslint-plugin-actionlint";

const actionlintOnlyPreset = actionlint.configs.actionlintOnly;
if (Array.isArray(actionlintOnlyPreset))
    throw new TypeError(
        "Expected actionlint.configs.actionlintOnly to be a flat config object."
    );
const localActionlintOnlyPreset =
    /** @type {import("eslint").Linter.Config} */ (actionlintOnlyPreset);

/** @type {import("eslint").Linter.Config[]} */
const config = [localActionlintOnlyPreset];

export default config;
