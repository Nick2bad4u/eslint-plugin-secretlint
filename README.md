# eslint-plugin-secretlint

[![npm license.](https://flat.badgen.net/npm/license/eslint-plugin-secretlint?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-secretlint/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/eslint-plugin-secretlint?color=pink)](https://www.npmjs.com/package/eslint-plugin-secretlint) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-secretlint?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-secretlint/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-secretlint?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-secretlint/stargazers)

`eslint-plugin-secretlint` runs Secretlint from ESLint and adds Secretlint-specific config authoring rules.

## Installation

```sh
npm install --save-dev eslint-plugin-secretlint eslint secretlint
```

### Compatibility

- **Supported ESLint versions:** `9.x` and `10.x`
- **Config system:** Flat Config only
- **Node.js runtime:** `>=22.0.0`

## Quick start

```ts
import secretlint from "eslint-plugin-secretlint";

export default [...secretlint.configs.recommended];
```

## Presets

| Preset                                                                         | Purpose                                                      |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [`secretlint.configs.recommended`](./docs/rules/presets/recommended.md)        | Enable the Secretlint bridge plus config authoring guidance. |
| [`secretlint.configs.secretlintOnly`](./docs/rules/presets/secretlint-only.md) | Enable only the Secretlint bridge workflow.                  |
| [`secretlint.configs.configuration`](./docs/rules/presets/configuration.md)    | Enable only Secretlint config authoring rules.               |
| [`secretlint.configs.all`](./docs/rules/presets/all.md)                        | Enable every rule shipped by the plugin.                     |

Aliases remain available:

- `secretlint.configs.text` -> `secretlint.configs.secretlintOnly`
- `secretlint.configs.configs` -> `secretlint.configs.configuration`

## Rules

Fix legend:

- `🔧` = autofixable
- `—` = report only

Preset key legend:

- [`🟡`](./docs/rules/presets/recommended.md) — [`secretlint.configs.recommended`](./docs/rules/presets/recommended.md)
- [`🧪`](./docs/rules/presets/secretlint-only.md) — [`secretlint.configs.secretlintOnly`](./docs/rules/presets/secretlint-only.md)
- [`🔧`](./docs/rules/presets/configuration.md) — [`secretlint.configs.configuration`](./docs/rules/presets/configuration.md)
- [`🟣`](./docs/rules/presets/all.md) — [`secretlint.configs.all`](./docs/rules/presets/all.md)

| Rule                                                                                                                                                                    | Fix | Preset key                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :------------------------------------------------------------------------------------------------------------------------ |
| [`disallow-secretlint-duplicate-rules`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-duplicate-rules)                           |  —  | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)   |
| [`disallow-secretlint-empty-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-empty-rule-id)                               |  —  | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)   |
| [`disallow-secretlint-relative-rule-paths`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-relative-rule-paths)                   |  —  | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)   |
| [`disallow-secretlint-unknown-rule-properties`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/disallow-secretlint-unknown-rule-properties)           |  —  | [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)                                             |
| [`prefer-secretlint-allow-message-ids-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-allow-message-ids-array)               |  —  | [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)                                             |
| [`prefer-secretlint-nested-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/prefer-secretlint-nested-rules-array)                         |  —  | [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)                                             |
| [`require-secretlint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-config-file-naming-convention) |  —  | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)   |
| [`require-secretlint-rule-id`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rule-id)                                             |  —  | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)   |
| [`require-secretlint-rules-array`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-array)                                     |  —  | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)   |
| [`require-secretlint-rules-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/require-secretlint-rules-packages-installed)           |  —  | [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md)                                             |
| [`secretlint`](https://nick2bad4u.github.io/eslint-plugin-secretlint/docs/rules/secretlint)                                                                             |  —  | [🟡](./docs/rules/presets/recommended.md) [🧪](./docs/rules/presets/secretlint-only.md) [🟣](./docs/rules/presets/all.md) |
