# disallow-secretlint-duplicate-rules

Disallow duplicate rules keeps secretlint configuration files predictable when they are reviewed beside ESLint configuration.

> **Rule catalog ID:** R001

## Targeted pattern scope

This rule targets Secretlint content and Secretlint configuration. Use it in repositories where ESLint is the central feedback surface for local development, CI, and editor diagnostics.

### Matched patterns

- Files matched by the bridge rule or the configuration preset that enables `secretlint/disallow-secretlint-duplicate-rules`.
- .secretlintrc.json and related secretlint configuration documents.

### Detection boundaries

The rule does not reimplement the full Secretlint configuration language. It validates the bridge-facing behavior that ESLint can report reliably and leaves deeper domain checks to Secretlint.

## What this rule reports

The rule reports duplicate secretlint rule entries that make the effective configuration ambiguous.

## Why this rule exists

Bridge plugins are useful only when they preserve upstream behavior and keep configuration reviewable. This rule keeps secretlint feedback close to ESLint without forcing users to copy an entire upstream config into ESLint options.

## ❌ Incorrect

```yaml
.secretlintrc.json
rules:
  - id: example-rule
  - id: example-rule
```

## ✅ Correct

```yaml
.secretlintrc.json
rules:
  - id: example-rule
```

## Behavior and migration notes

Start with the recommended preset when adopting the plugin. Move project-specific secretlint options into the upstream config file and keep ESLint options limited to file selection, config path, and bridge behavior.

## Additional examples

```js
import secretlint from "eslint-plugin-secretlint";

export default [
 secretlint.configs.recommended,
 {
  rules: {
   "secretlint/disallow-secretlint-duplicate-rules": "error",
  },
 },
];
```

## ESLint flat config example

```js
import secretlint from "eslint-plugin-secretlint";

export default [secretlint.configs.recommended];
```

## When not to use it

Do not enable this rule when Secretlint is intentionally run outside ESLint and duplicate editor or CI diagnostics would slow the project down.

## Package documentation

eslint-plugin-secretlint package documentation:

- [Plugin README](https://github.com/Nick2bad4u/eslint-plugin-secretlint#readme)
- [Rule source](https://github.com/Nick2bad4u/eslint-plugin-secretlint/tree/main/src/rules)

## Further reading

- [Secretlint documentation](https://github.com/secretlint/secretlint)
- [ESLint flat config documentation](https://eslint.org/docs/latest/use/configure/configuration-files)

## Adoption resources

- Enable the recommended preset first.
- Keep upstream configuration in `.secretlintrc.json` unless a rule option explicitly asks for a different file.
- Run `npm run lint:remark` before publishing docs changes so heading drift is caught locally.
