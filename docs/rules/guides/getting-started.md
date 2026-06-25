# Adoption checklist

Use this checklist when adding the plugin to an existing repository.

## Start small

- Enable [`secretlint.configs.recommended`](../presets/recommended.md) only for text-like files that should be scanned.
- Exclude generated files, vendored assets, and fixtures that intentionally contain fake secrets.
- Keep the native Secretlint config file as the source of truth for scanning behavior.

## Add policy after the bridge is green

- Add [`secretlint.configs.configuration`](../presets/configuration.md) for `.secretlintrc` files.
- Fix duplicate, empty, or relative rule references before rolling the preset into shared configs.
- Review the [tool behavior map](./tool-to-rule-map.md) if a finding looks like it could belong to either Secretlint or ESLint.

## CI rollout

Run ESLint in the same job that already checks TypeScript, Markdown, and package metadata. The value of the bridge is one diagnostics stream, not another standalone command that developers forget to run.
