import secretlintDuplicateRulesRule from "../rules/disallow-secretlint-duplicate-rules.js";
import secretlintEmptyRuleIdRule from "../rules/disallow-secretlint-empty-rule-id.js";
import secretlintRelativeRulePathsRule from "../rules/disallow-secretlint-relative-rule-paths.js";
import secretlintUnknownRulePropertiesRule from "../rules/disallow-secretlint-unknown-rule-properties.js";
import preferSecretlintAllowMessageIdsArrayRule from "../rules/prefer-secretlint-allow-message-ids-array.js";
import preferSecretlintNestedRulesArrayRule from "../rules/prefer-secretlint-nested-rules-array.js";
import secretlintConfigFileNamingConventionRule from "../rules/require-secretlint-config-file-naming-convention.js";
import secretlintRuleIdRule from "../rules/require-secretlint-rule-id.js";
import secretlintRulesArrayRule from "../rules/require-secretlint-rules-array.js";
import secretlintRulesPackagesInstalledRule from "../rules/require-secretlint-rules-packages-installed.js";
// eslint-disable-next-line import-x/max-dependencies -- Rule registries intentionally import every rule module for plugin export wiring.
import secretlintRule from "../rules/secretlint.js";

type SecretlintRulesRegistry = Readonly<{
    "disallow-secretlint-duplicate-rules": typeof secretlintDuplicateRulesRule;
    "disallow-secretlint-empty-rule-id": typeof secretlintEmptyRuleIdRule;
    "disallow-secretlint-relative-rule-paths": typeof secretlintRelativeRulePathsRule;
    "disallow-secretlint-unknown-rule-properties": typeof secretlintUnknownRulePropertiesRule;
    "prefer-secretlint-allow-message-ids-array": typeof preferSecretlintAllowMessageIdsArrayRule;
    "prefer-secretlint-nested-rules-array": typeof preferSecretlintNestedRulesArrayRule;
    "require-secretlint-config-file-naming-convention": typeof secretlintConfigFileNamingConventionRule;
    "require-secretlint-rule-id": typeof secretlintRuleIdRule;
    "require-secretlint-rules-array": typeof secretlintRulesArrayRule;
    "require-secretlint-rules-packages-installed": typeof secretlintRulesPackagesInstalledRule;
    secretlint: typeof secretlintRule;
}>;

/**
 * SecretlintRules secretlint rules contract.
 */
export const secretlintRules: SecretlintRulesRegistry = {
    "disallow-secretlint-duplicate-rules": secretlintDuplicateRulesRule,
    "disallow-secretlint-empty-rule-id": secretlintEmptyRuleIdRule,
    "disallow-secretlint-relative-rule-paths": secretlintRelativeRulePathsRule,
    "disallow-secretlint-unknown-rule-properties":
        secretlintUnknownRulePropertiesRule,
    "prefer-secretlint-allow-message-ids-array":
        preferSecretlintAllowMessageIdsArrayRule,
    "prefer-secretlint-nested-rules-array":
        preferSecretlintNestedRulesArrayRule,
    "require-secretlint-config-file-naming-convention":
        secretlintConfigFileNamingConventionRule,
    "require-secretlint-rule-id": secretlintRuleIdRule,
    "require-secretlint-rules-array": secretlintRulesArrayRule,
    "require-secretlint-rules-packages-installed":
        secretlintRulesPackagesInstalledRule,
    secretlint: secretlintRule,
} as const satisfies SecretlintRulesRegistry;

/**
 * SecretlintRuleNamePattern secretlint rule name pattern contract.
 */
export type SecretlintRuleNamePattern = keyof typeof secretlintRules;

export default secretlintRules;
