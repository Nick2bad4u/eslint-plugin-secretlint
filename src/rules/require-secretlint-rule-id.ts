import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

const requireSecretlintRuleIdRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "require every Secretlint rule entry to define an id.",
    name: "require-secretlint-rule-id",
    propertyName: "rules",
    recommended: true,
});

export default requireSecretlintRuleIdRule;
