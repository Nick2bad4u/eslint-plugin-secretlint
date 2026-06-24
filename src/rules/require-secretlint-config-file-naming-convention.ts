import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createFilenameRule } from "../_internal/config-rule-factories.js";

const requireSecretlintConfigFileNamingConventionRule: RuleModuleWithDocs<
    "configProblem",
    readonly []
> = createFilenameRule({
    allowedPattern:
        /(?:^|\/)(\.secretlintrc\.(?:[cm]?js|json|jsonc|ya?ml)|secretlint\.config\.[cm]?js)$/v,
    configs: [
        "secretlint.configs.configuration",
        "secretlint.configs.recommended",
        "secretlint.configs.all",
    ],
    description:
        "require Secretlint config files to use a supported Secretlint config filename.",
    name: "require-secretlint-config-file-naming-convention",
    recommended: true,
});

export default requireSecretlintConfigFileNamingConventionRule;
