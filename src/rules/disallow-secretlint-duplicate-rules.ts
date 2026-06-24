import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

const disallowSecretlintDuplicateRulesRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "disallow duplicate Secretlint rule ids.",
    name: "disallow-secretlint-duplicate-rules",
    propertyName: "rules",
    recommended: true,
});

export default disallowSecretlintDuplicateRulesRule;
