import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

/**
 * DisallowSecretlintRelativeRulePathsRule ESLint rule contract.
 */
const disallowSecretlintRelativeRulePathsRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "disallow relative Secretlint rule module paths.",
    name: "disallow-secretlint-relative-rule-paths",
    propertyName: "rules",
    recommended: true,
});

export default disallowSecretlintRelativeRulePathsRule;
