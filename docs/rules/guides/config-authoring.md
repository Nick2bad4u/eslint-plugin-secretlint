# Config authoring

The configuration preset checks Secretlint config files as repository policy. It is not a replacement for Secretlint's scanner or rule packages.

## What to enforce

- Use an expected Secretlint config filename so tools and humans find it quickly.
- Keep `rules` as an array and nested `rules` entries as arrays when present.
- Require stable rule IDs.
- Reject duplicate, empty, or relative rule IDs.
- Reject unknown rule-object properties.
- Verify referenced Secretlint rule packages are installed.

## Example

```js
import secretlint from "eslint-plugin-secretlint";

export default [
 {
  files: [".secretlintrc.{json,yaml,yml,js,cjs,mjs}"],
  ...secretlint.configs.configuration,
 },
];
```

## Related pages

Use the [configuration preset](../presets/configuration.md) for the curated set. Use the [tool behavior map](./tool-to-rule-map.md) to decide whether a policy should be enforced by Secretlint or by one of this plugin's config-authoring rules.
