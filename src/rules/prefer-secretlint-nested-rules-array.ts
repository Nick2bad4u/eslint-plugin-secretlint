import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

/**
 * PreferSecretlintNestedRulesArrayRule ESLint rule contract.
 */
const preferSecretlintNestedRulesArrayRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "prefer nested Secretlint preset rules to remain arrays.",
    name: "prefer-secretlint-nested-rules-array",
    propertyName: "rules",
    recommended: false,
});

export default preferSecretlintNestedRulesArrayRule;
