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
