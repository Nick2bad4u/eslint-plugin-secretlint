# All

Enable the Secretlint bridge and every Secretlint config-authoring rule shipped by this plugin.

Use this preset when you want the broadest policy surface and are comfortable with new config rules becoming active as the plugin grows.

## Flat config example

```ts
import secretlint from "eslint-plugin-secretlint";

export default [...secretlint.configs.all];
```

## Best fit

- Repository templates that should enforce the full Secretlint policy from day one.
- Security-sensitive repos that want config drift caught with normal ESLint diagnostics.
- Mature repositories after the recommended preset has already been rolled out.

## What this preset includes

- `secretlint/secretlint`
- Every configuration-authoring rule currently exported by the plugin.

## What this preset does not include

- Nothing from this plugin is excluded.

## Related preset docs

- [Presets overview](./index.md)
- [Recommended preset](./recommended.md)
- [Secretlint-only preset](./secretlint-only.md)
- [Configuration preset](./configuration.md)

## Rules in this preset

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `secretlint.configs.all`.

Fix legend:

- `🔧` = autofixable
- `—` = report only

| Rule                                                                                                                                                                    | Fix | This preset | Also enabled in                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :---------- | :------------------------------------------------ |
| [`secretlint`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/secretlint)                                                                             |  —  | 🟣 Enabled  | [🟡](./recommended.md) [🧪](./secretlint-only.md) |
| [`require-secretlint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-config-file-naming-convention) |  —  | 🟣 Enabled  | [🟡](./recommended.md) [🔧](./configuration.md)   |
| [`require-secretlint-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-array)                                     |  —  | 🟣 Enabled  | [🟡](./recommended.md) [🔧](./configuration.md)   |
| [`require-secretlint-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rule-id)                                             |  —  | 🟣 Enabled  | [🟡](./recommended.md) [🔧](./configuration.md)   |
| [`disallow-secretlint-duplicate-rules`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-duplicate-rules)                           |  —  | 🟣 Enabled  | [🟡](./recommended.md) [🔧](./configuration.md)   |
| [`disallow-secretlint-empty-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-empty-rule-id)                               |  —  | 🟣 Enabled  | [🟡](./recommended.md) [🔧](./configuration.md)   |
| [`disallow-secretlint-relative-rule-paths`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-relative-rule-paths)                   |  —  | 🟣 Enabled  | [🟡](./recommended.md) [🔧](./configuration.md)   |
| [`disallow-secretlint-unknown-rule-properties`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-unknown-rule-properties)           |  —  | 🟣 Enabled  | [🔧](./configuration.md)                          |
| [`prefer-secretlint-allow-message-ids-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-allow-message-ids-array)               |  —  | 🟣 Enabled  | [🔧](./configuration.md)                          |
| [`prefer-secretlint-nested-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-nested-rules-array)                         |  —  | 🟣 Enabled  | [🔧](./configuration.md)                          |
| [`require-secretlint-rules-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-packages-installed)           |  —  | 🟣 Enabled  | [🔧](./configuration.md)                          |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
