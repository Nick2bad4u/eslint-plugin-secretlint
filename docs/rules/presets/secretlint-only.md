# Secretlint bridge only

Enable only the Secretlint bridge rule for text-like files.

This is the smallest adoption surface. It runs upstream Secretlint through ESLint and leaves Secretlint config-authoring policy out of the preset.

## Flat config example

```ts
import secretlint from "eslint-plugin-secretlint";

export default [...secretlint.configs.secretlintOnly];
```

Legacy alias: `secretlint.configs.text` remains supported.

## Best fit

- Repositories that only want secret-detection diagnostics in ESLint.
- Teams migrating from a standalone `secretlint` CI step.
- Projects that already manage Secretlint config conventions elsewhere.

## What this preset includes

- `secretlint/secretlint`
- Parser-neutral bridge wiring for files that already have an ESLint parser.
- Raw text parser fallback for plain text file types.
- Default ignores for common generated directories.

## What this preset does not include

- Secretlint config file naming checks.
- Shape, duplicate, package-installed, or relative-path policy for Secretlint config files.

## Related preset docs

- [Presets overview](./index.md)
- [Recommended preset](./recommended.md)
- [Configuration preset](./configuration.md)
- [All preset](./all.md)

## Rules in this preset

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `secretlint.configs.secretlintOnly`.

Fix legend:

- `🔧` = autofixable
- `—` = report only

| Rule                                                                                                                                                                    | Fix | This preset | Also enabled in                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :---------- | :------------------------------------------------------------- |
| [`secretlint`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/secretlint)                                                                             |  —  | 🧪 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                          |
| [`require-secretlint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-config-file-naming-convention) |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-secretlint-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-array)                                     |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-secretlint-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rule-id)                                             |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-secretlint-duplicate-rules`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-duplicate-rules)                           |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-secretlint-empty-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-empty-rule-id)                               |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-secretlint-relative-rule-paths`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-relative-rule-paths)                   |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-secretlint-unknown-rule-properties`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-unknown-rule-properties)           |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)                        |
| [`prefer-secretlint-allow-message-ids-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-allow-message-ids-array)               |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)                        |
| [`prefer-secretlint-nested-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-nested-rules-array)                         |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)                        |
| [`require-secretlint-rules-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-packages-installed)           |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)                        |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
