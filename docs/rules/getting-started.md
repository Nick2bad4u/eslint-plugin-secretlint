# Getting started

Install `eslint-plugin-secretlint`, add one flat-config preset, and run ESLint over the files where you want Secretlint findings in the normal ESLint output.

## Install

```sh
npm install --save-dev eslint-plugin-secretlint
```

The plugin delegates scanning to Secretlint. Keep Secretlint rule packages and scanning policy in Secretlint config, then use this plugin for ESLint integration and config-file guardrails.

## Add the recommended preset

```js
import secretlint from "eslint-plugin-secretlint";

export default [
 {
  files: ["**/*.{md,mdx,txt,json,yaml,yml}"],
  ...secretlint.configs.recommended,
 },
];
```

Use a deliberate `files` list. Secret scanning can be expensive and noisy if you point it at generated output, lockfiles, or vendored assets.

## Add config-file checks

```js
import secretlint from "eslint-plugin-secretlint";

export default [
 {
  files: ["**/*.{md,mdx,txt,json,yaml,yml}"],
  ...secretlint.configs.recommended,
 },
 {
  files: [".secretlintrc.{json,yaml,yml,js,cjs,mjs}"],
  ...secretlint.configs.configuration,
 },
];
```

The configuration preset checks Secretlint config shape and rule references. Native secret detection still belongs to Secretlint.

## Choose a narrower preset

- Use [`secretlint.configs.secretlintOnly`](./presets/secretlint-only.md) when you only want upstream Secretlint findings.
- Use [`secretlint.configs.configuration`](./presets/configuration.md) when another job already runs Secretlint and ESLint should only police config files.
- Use [`secretlint.configs.all`](./presets/all.md) when you want every rule enabled explicitly.

Next, read the [Secretlint bridge guide](./guides/secretlint-bridge.md) and the [config-authoring guide](./guides/config-authoring.md).
