# FAQ

## Does this replace Secretlint?

No. The bridge delegates scanning to Secretlint and reports the results through ESLint.

## Should I run Secretlint separately in CI?

Usually no, if ESLint already runs the `secretlint/secretlint` rule over the same files. Running both can be useful during migration, but long term it creates duplicate findings.

## Where should Secretlint options live?

Keep Secretlint behavior in the Secretlint config file. Use ESLint config for file selection, severity, and repository policy rules.

## Why are there config-authoring rules?

They catch config drift that native scanning does not try to police: unsupported filenames, malformed rule arrays, duplicate rule IDs, missing rule packages, relative rule paths, and brittle allow-message settings.

## Which preset should I use?

Use [`recommended`](../presets/recommended.md) for normal adoption. Use [`secretlint-only`](../presets/secretlint-only.md) when you only want upstream findings, and [`configuration`](../presets/configuration.md) when another job already handles scanning.
