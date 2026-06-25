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
