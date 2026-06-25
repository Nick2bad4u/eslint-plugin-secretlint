# Recommended

Enable the Secretlint bridge plus the common Secretlint config-authoring checks.

This is the default rollout path for most repositories. It surfaces secret findings in ESLint while enforcing low-noise config structure rules.

## Flat config example

```ts
import secretlint from "eslint-plugin-secretlint";

export default [...secretlint.configs.recommended];
```

## Best fit

- Application and package repositories that want one ESLint command to cover content scanning and Secretlint config files.
- Teams adopting Secretlint in editors and CI at the same time.
- Repositories that want config hygiene without enabling every stricter policy immediately.

## What this preset includes

- `secretlint/secretlint`
- High-signal Secretlint config rules for required rule ids, rules arrays, duplicate entries, relative paths, file naming, and empty rule ids.

## What this preset does not include

- More opinionated config cleanup from [`configuration`](./configuration.md), such as nested array preferences, package-installed checks, and unknown rule property checks.
- The full policy surface from [`all`](./all.md).

## Related preset docs

- [Presets overview](./index.md)
- [Secretlint-only preset](./secretlint-only.md)
- [Configuration preset](./configuration.md)
- [All preset](./all.md)

## Rules in this preset

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `secretlint.configs.recommended`.

Fix legend:

- `🔧` = autofixable
- `—` = report only

| Rule                                                                                                                                                                    | Fix | This preset | Also enabled in                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :---------- | :---------------------------------------- |
| [`secretlint`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/secretlint)                                                                             |  —  | 🟡 Enabled  | [🧪](./secretlint-only.md) [🟣](./all.md) |
| [`require-secretlint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-config-file-naming-convention) |  —  | 🟡 Enabled  | [🔧](./configuration.md) [🟣](./all.md)   |
| [`require-secretlint-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-array)                                     |  —  | 🟡 Enabled  | [🔧](./configuration.md) [🟣](./all.md)   |
| [`require-secretlint-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rule-id)                                             |  —  | 🟡 Enabled  | [🔧](./configuration.md) [🟣](./all.md)   |
| [`disallow-secretlint-duplicate-rules`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-duplicate-rules)                           |  —  | 🟡 Enabled  | [🔧](./configuration.md) [🟣](./all.md)   |
| [`disallow-secretlint-empty-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-empty-rule-id)                               |  —  | 🟡 Enabled  | [🔧](./configuration.md) [🟣](./all.md)   |
| [`disallow-secretlint-relative-rule-paths`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-relative-rule-paths)                   |  —  | 🟡 Enabled  | [🔧](./configuration.md) [🟣](./all.md)   |
| [`disallow-secretlint-unknown-rule-properties`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-unknown-rule-properties)           |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)   |
| [`prefer-secretlint-allow-message-ids-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-allow-message-ids-array)               |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)   |
| [`prefer-secretlint-nested-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-nested-rules-array)                         |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)   |
| [`require-secretlint-rules-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-packages-installed)           |  —  | —           | [🔧](./configuration.md) [🟣](./all.md)   |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
