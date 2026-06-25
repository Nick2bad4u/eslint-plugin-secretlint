# Tool behavior to rule map

Use this page to decide whether a finding should come from Secretlint itself or from this plugin's ESLint rules.

| Concern                               | Source of truth        | ESLint rule                                                                                                  |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Secret detection and masking behavior | Secretlint             | [`secretlint/secretlint`](../secretlint.md)                                                                  |
| Secretlint config filename            | Repository policy      | [`require-secretlint-config-file-naming-convention`](../require-secretlint-config-file-naming-convention.md) |
| Top-level `rules` container           | Repository policy      | [`require-secretlint-rules-array`](../require-secretlint-rules-array.md)                                     |
| Rule IDs                              | Repository policy      | [`require-secretlint-rule-id`](../require-secretlint-rule-id.md)                                             |
| Duplicate rule IDs                    | Repository policy      | [`disallow-secretlint-duplicate-rules`](../disallow-secretlint-duplicate-rules.md)                           |
| Empty rule IDs                        | Repository policy      | [`disallow-secretlint-empty-rule-id`](../disallow-secretlint-empty-rule-id.md)                               |
| Relative rule paths                   | Repository policy      | [`disallow-secretlint-relative-rule-paths`](../disallow-secretlint-relative-rule-paths.md)                   |
| Known rule object properties          | Repository policy      | [`disallow-secretlint-unknown-rule-properties`](../disallow-secretlint-unknown-rule-properties.md)           |
| `allowMessageIds` shape               | Repository policy      | [`prefer-secretlint-allow-message-ids-array`](../prefer-secretlint-allow-message-ids-array.md)               |
| Nested `rules` shape                  | Repository policy      | [`prefer-secretlint-nested-rules-array`](../prefer-secretlint-nested-rules-array.md)                         |
| Installed rule packages               | Repository environment | [`require-secretlint-rules-packages-installed`](../require-secretlint-rules-packages-installed.md)           |

If the issue changes what is considered a secret, let Secretlint own it. If the issue makes the Secretlint config easier to review and reuse across repositories, enforce it with this plugin.
