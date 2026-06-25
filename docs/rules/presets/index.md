# Presets

`eslint-plugin-secretlint` exposes focused flat-config presets for secret scanning and Secretlint config authoring.

- `🟡` [`secretlint.configs.recommended`](./recommended.md) — default rollout path for secret diagnostics plus common config hygiene.
- `🧪` [`secretlint.configs.secretlintOnly`](./secretlint-only.md) — bridge-only text secret scanning.
- `🔧` [`secretlint.configs.configuration`](./configuration.md) — config-authoring rules without content scanning.
- `🟣` [`secretlint.configs.all`](./all.md) — every current bridge and config-authoring rule.

Legacy aliases remain available for compatibility:

- `secretlint.configs.text` → `secretlint.configs.secretlintOnly`
- `secretlint.configs.configs` → `secretlint.configs.configuration`

Use the preset pages in this section for copy/paste config snippets and rollout notes.

## Rule matrix

| Rule                                                                                                                                                                    | Fix | Preset key                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :--------------------------------------------------------------- |
| [`disallow-secretlint-duplicate-rules`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-duplicate-rules)                           |  —  | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md)   |
| [`disallow-secretlint-empty-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-empty-rule-id)                               |  —  | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md)   |
| [`disallow-secretlint-relative-rule-paths`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-relative-rule-paths)                   |  —  | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md)   |
| [`disallow-secretlint-unknown-rule-properties`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-unknown-rule-properties)           |  —  | [🔧](./configuration.md) [🟣](./all.md)                          |
| [`prefer-secretlint-allow-message-ids-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-allow-message-ids-array)               |  —  | [🔧](./configuration.md) [🟣](./all.md)                          |
| [`prefer-secretlint-nested-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-nested-rules-array)                         |  —  | [🔧](./configuration.md) [🟣](./all.md)                          |
| [`require-secretlint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-config-file-naming-convention) |  —  | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md)   |
| [`require-secretlint-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rule-id)                                             |  —  | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md)   |
| [`require-secretlint-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-array)                                     |  —  | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md)   |
| [`require-secretlint-rules-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-packages-installed)           |  —  | [🔧](./configuration.md) [🟣](./all.md)                          |
| [`secretlint`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/secretlint)                                                                             |  —  | [🟡](./recommended.md) [🧪](./secretlint-only.md) [🟣](./all.md) |
