import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRequirePropertyRule } from "../_internal/config-rule-factories.js";

const preferSecretlintAllowMessageIdsArrayRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createRequirePropertyRule({
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description: "prefer allowMessageIds values to be arrays.",
    name: "prefer-secretlint-allow-message-ids-array",
    propertyName: "rules",
    recommended: false,
});

export default preferSecretlintAllowMessageIdsArrayRule;
