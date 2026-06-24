import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

/**
 * DisallowSecretlintUnknownRulePropertiesRule ESLint rule contract.
 */
const disallowSecretlintUnknownRulePropertiesRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "disallow unknown Secretlint rule descriptor properties.",
    name: "disallow-secretlint-unknown-rule-properties",
    propertyName: "rules",
    recommended: false,
});

export default disallowSecretlintUnknownRulePropertiesRule;
