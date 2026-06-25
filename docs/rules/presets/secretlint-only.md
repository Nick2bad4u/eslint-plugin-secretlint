# Secretlint bridge only

Enable only the Secretlint bridge rule for text-like files.

This is the smallest adoption surface. It runs upstream Secretlint through ESLint and leaves Secretlint config-authoring policy out of the preset.

## Flat config example

```ts
import secretlint from "eslint-plugin-secretlint";

export default [secretlint.configs.secretlintOnly];
```

Legacy alias: `secretlint.configs.text` remains supported.

## Best fit

- Repositories that only want secret-detection diagnostics in ESLint.
- Teams migrating from a standalone `secretlint` CI step.
- Projects that already manage Secretlint config conventions elsewhere.

## What this preset includes

- `secretlint/secretlint`
- Raw text parser wiring for the files matched by the preset.
- Default ignores for common generated directories.

## What this preset does not include

- Secretlint config file naming checks.
- Shape, duplicate, package-installed, or relative-path policy for Secretlint config files.

## Related preset docs

- [Presets overview](./index.md)
- [Recommended preset](./recommended.md)
- [Configuration preset](./configuration.md)
- [All preset](./all.md)
