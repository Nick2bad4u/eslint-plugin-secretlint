# prefer-secretlint-allow-message-ids-array

prefer allowMessageIds values to be arrays.

## Rule details

This rule is part of `eslint-plugin-secretlint` and reports Secretlint bridge or config-authoring diagnostics through ESLint flat config.

## ESLint flat config example

```ts
import secretlint from "eslint-plugin-secretlint";

export default [...secretlint.configs.recommended];
```
