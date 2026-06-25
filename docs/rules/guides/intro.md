# Guide overview

`eslint-plugin-secretlint` is a bridge plugin. It lets ESLint run Secretlint and report secret-detection findings through the normal ESLint formatter, while separate rules cover the shape and maintainability of Secretlint config files.

## Use the guides in this order

1. Start with [Getting started](../getting-started.md) to add the recommended preset.
2. Read [Secretlint bridge](./secretlint-bridge.md) when you need to understand what the bridge rule delegates to upstream Secretlint.
3. Read [Config authoring](./config-authoring.md) before enabling the configuration preset on `.secretlintrc` files.
4. Use [Tool behavior to rule map](./tool-to-rule-map.md) when deciding whether a finding should come from Secretlint or from this plugin's ESLint rules.

## Boundary

This plugin should not become a second Secretlint implementation. If a setting changes what is treated as a secret, keep it in Secretlint config. If a rule enforces repository consistency around that config file, it belongs in the configuration preset.
