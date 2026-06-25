# Configuration

Enable only the Secretlint config-authoring rules.

Use this preset when secret scanning is handled elsewhere, but ESLint should still keep `.secretlintrc.*` and Secretlint config modules predictable and reviewable.

## Flat config example

```ts
import secretlint from "eslint-plugin-secretlint";

export default [secretlint.configs.configuration];
```

Legacy alias: `secretlint.configs.configs` remains supported.

## Best fit

- Shared config repositories that publish Secretlint defaults.
- Monorepos with centralized secret scanning but local Secretlint config files.
- Teams that want config hygiene without running the Secretlint bridge through ESLint.

## What this preset includes

- Secretlint config filename checks.
- Required `rules` array and rule-id checks.
- Duplicate-rule, unknown-property, relative-path, package-installed, and array-shape policy.

## What this preset does not include

- The `secretlint/secretlint` bridge rule.
- Secret-detection diagnostics from upstream Secretlint.

## Related preset docs

- [Presets overview](./index.md)
- [Recommended preset](./recommended.md)
- [Secretlint-only preset](./secretlint-only.md)
- [All preset](./all.md)

## Rules in this preset

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `secretlint.configs.configuration`.

Fix legend:

- `🔧` = autofixable
- `—` = report only

| Rule                                                                                                                                                                    | Fix | This preset | Also enabled in                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :---------- | :--------------------------------------------------------------- |
| [`secretlint`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/secretlint)                                                                             |  —  | —           | [🟡](./recommended.md) [🧪](./secretlint-only.md) [🟣](./all.md) |
| [`require-secretlint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-config-file-naming-convention) |  —  | 🔧 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                            |
| [`require-secretlint-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-array)                                     |  —  | 🔧 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                            |
| [`require-secretlint-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rule-id)                                             |  —  | 🔧 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                            |
| [`disallow-secretlint-duplicate-rules`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-duplicate-rules)                           |  —  | 🔧 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                            |
| [`disallow-secretlint-empty-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-empty-rule-id)                               |  —  | 🔧 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                            |
| [`disallow-secretlint-relative-rule-paths`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-relative-rule-paths)                   |  —  | 🔧 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                            |
| [`disallow-secretlint-unknown-rule-properties`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-unknown-rule-properties)           |  —  | 🔧 Enabled  | [🟣](./all.md)                                                   |
| [`prefer-secretlint-allow-message-ids-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-allow-message-ids-array)               |  —  | 🔧 Enabled  | [🟣](./all.md)                                                   |
| [`prefer-secretlint-nested-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-nested-rules-array)                         |  —  | 🔧 Enabled  | [🟣](./all.md)                                                   |
| [`require-secretlint-rules-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-packages-installed)           |  —  | 🔧 Enabled  | [🟣](./all.md)                                                   |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
