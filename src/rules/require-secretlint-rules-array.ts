import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

const requireSecretlintRulesArrayRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "require Secretlint configs to define rules as an array.",
    name: "require-secretlint-rules-array",
    propertyName: "rules",
    recommended: true,
});

export default requireSecretlintRulesArrayRule;
