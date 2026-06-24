import disallowSecretlintDuplicateRulesRule from "../rules/disallow-secretlint-duplicate-rules.js";
import disallowSecretlintEmptyRuleIdRule from "../rules/disallow-secretlint-empty-rule-id.js";
import disallowSecretlintRelativeRulePathsRule from "../rules/disallow-secretlint-relative-rule-paths.js";
import disallowSecretlintUnknownRulePropertiesRule from "../rules/disallow-secretlint-unknown-rule-properties.js";
import preferSecretlintAllowMessageIdsArrayRule from "../rules/prefer-secretlint-allow-message-ids-array.js";
import preferSecretlintNestedRulesArrayRule from "../rules/prefer-secretlint-nested-rules-array.js";
import requireSecretlintConfigFileNamingConventionRule from "../rules/require-secretlint-config-file-naming-convention.js";
import requireSecretlintRuleIdRule from "../rules/require-secretlint-rule-id.js";
import requireSecretlintRulesArrayRule from "../rules/require-secretlint-rules-array.js";
import requireSecretlintRulesPackagesInstalledRule from "../rules/require-secretlint-rules-packages-installed.js";
import secretlintRule from "../rules/secretlint.js";

type SecretlintRulesRegistry = Readonly<{
    "disallow-secretlint-duplicate-rules": typeof disallowSecretlintDuplicateRulesRule;
    "disallow-secretlint-empty-rule-id": typeof disallowSecretlintEmptyRuleIdRule;
    "disallow-secretlint-relative-rule-paths": typeof disallowSecretlintRelativeRulePathsRule;
    "disallow-secretlint-unknown-rule-properties": typeof disallowSecretlintUnknownRulePropertiesRule;
    "prefer-secretlint-allow-message-ids-array": typeof preferSecretlintAllowMessageIdsArrayRule;
    "prefer-secretlint-nested-rules-array": typeof preferSecretlintNestedRulesArrayRule;
    "require-secretlint-config-file-naming-convention": typeof requireSecretlintConfigFileNamingConventionRule;
    "require-secretlint-rule-id": typeof requireSecretlintRuleIdRule;
    "require-secretlint-rules-array": typeof requireSecretlintRulesArrayRule;
    "require-secretlint-rules-packages-installed": typeof requireSecretlintRulesPackagesInstalledRule;
    secretlint: typeof secretlintRule;
}>;

export const secretlintRules: SecretlintRulesRegistry = {
    "disallow-secretlint-duplicate-rules": disallowSecretlintDuplicateRulesRule,
    "disallow-secretlint-empty-rule-id": disallowSecretlintEmptyRuleIdRule,
    "disallow-secretlint-relative-rule-paths":
        disallowSecretlintRelativeRulePathsRule,
    "disallow-secretlint-unknown-rule-properties":
        disallowSecretlintUnknownRulePropertiesRule,
    "prefer-secretlint-allow-message-ids-array":
        preferSecretlintAllowMessageIdsArrayRule,
    "prefer-secretlint-nested-rules-array":
        preferSecretlintNestedRulesArrayRule,
    "require-secretlint-config-file-naming-convention":
        requireSecretlintConfigFileNamingConventionRule,
    "require-secretlint-rule-id": requireSecretlintRuleIdRule,
    "require-secretlint-rules-array": requireSecretlintRulesArrayRule,
    "require-secretlint-rules-packages-installed":
        requireSecretlintRulesPackagesInstalledRule,
    secretlint: secretlintRule,
} as const satisfies SecretlintRulesRegistry;

export type SecretlintRuleNamePattern = keyof typeof secretlintRules;

export default secretlintRules;
