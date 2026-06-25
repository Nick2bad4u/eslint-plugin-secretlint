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
