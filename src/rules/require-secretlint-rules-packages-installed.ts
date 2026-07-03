import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

/**
 * RequireSecretlintRulesPackagesInstalledRule ESLint rule contract.
 */
const secretlintRulesPackagesInstalledRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "require referenced Secretlint rule packages to be installed.",
    name: "require-secretlint-rules-packages-installed",
    propertyName: "rules",
    recommended: false,
});

export default secretlintRulesPackagesInstalledRule;
