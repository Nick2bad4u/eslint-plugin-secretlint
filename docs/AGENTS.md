---
name: "Codex-Instructions-ESLint-Secretlint-Docs"
description: "Instructions for writing eslint-plugin-secretlint documentation."
applyTo: "docs/**"
---

# Documentation Instructions

- Rule docs live in `docs/rules/<rule-id>.md` and must be manually authored.
- Keep examples Secretlint-specific and verify they match the implemented AST selector or bridge behavior.
- Use Flat Config examples only.
- Keep preset pages, README tables, and sidebar entries aligned with rule metadata and sync scripts.
- Do not leave Remark or Stylelint examples in rule, guide, or Docusaurus content.
- When documenting `secretlint/secretlint`, distinguish ESLint-side bridge behavior from native Secretlint behavior.
