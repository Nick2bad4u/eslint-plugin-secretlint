---
name: "Copilot-Instructions-ESLint-Secretlint-Plugin"
description: "Instructions for maintaining eslint-plugin-secretlint."
applyTo: "**"
---

# eslint-plugin-secretlint Instructions

## Project Role

This repository is `eslint-plugin-secretlint`: an ESLint Flat Config plugin that runs Secretlint through ESLint and provides Secretlint config-authoring rules for `.secretlintrc.*` files.

## Engineering Priorities

- Preserve the modern TypeScript, ESLint, Vitest, Docusaurus, package-validation, and sync-script infrastructure.
- Keep rule metadata, docs, tests, README tables, and preset matrices synchronized.
- Prefer surgical edits over replacing mature config or docs infrastructure.
- Do not reintroduce copied Remark or Stylelint content as filler.
- Do not invent new rules unless the user explicitly requests them or they are clearly part of Secretlint bridge/config policy work.

## Rule Implementation Standards

- Put rules in `src/rules/` and shared helpers in `src/_internal/`.
- Use `@typescript-eslint/utils` and repository helper types for strict rule definitions.
- No `any`; use `unknown`, type guards, precise generics, and existing utility types.
- Use specific AST selectors where possible.
- Every rule needs static metadata, actionable messages, schema, docs URL, tests, and a matching docs page.
- Autofix when the transformation is deterministic and safe; otherwise report only or provide suggestions.

## Secretlint Bridge Constraints

- The `secretlint/secretlint` rule delegates secret detection to upstream Secretlint.
- Keep Secretlint execution isolated in the worker-backed bridge so ESLint rule execution remains synchronous.
- Treat Secretlint config loading and rule-package resolution as runtime boundaries and fail gracefully with ESLint diagnostics.
- Keep Secretlint scanning policy in Secretlint config; use ESLint rules for repository conventions around that config file.

## Verification

Before claiming the repo is ready, run the relevant gate for the change. For broad migration work, prefer the aggregate release gate:

```bash
npm run release:verify
```

If a command produces large output, redirect it under `temp/` and inspect the relevant lines from there.
