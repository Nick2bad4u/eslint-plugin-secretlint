import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createNoEmptyStringRule } from "../_internal/config-rule-factories.js";

/**
 * DisallowSecretlintEmptyRuleIdRule ESLint rule contract.
 */
const disallowSecretlintEmptyRuleIdRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createNoEmptyStringRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "disallow empty Secretlint rule ids.",
    name: "disallow-secretlint-empty-rule-id",
    recommended: true,
});

export default disallowSecretlintEmptyRuleIdRule;
