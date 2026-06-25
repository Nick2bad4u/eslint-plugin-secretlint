# Secretlint bridge

The `secretlint/secretlint` rule runs Secretlint and converts upstream findings into ESLint reports. ESLint owns file selection, ignore behavior, formatter output, and editor integration. Secretlint owns secret detection, rule packages, masking behavior, and scanner semantics.

## What the bridge reports

The bridge is for source and documentation files where accidental credentials can appear. It reports Secretlint findings with normal ESLint locations and severities.

Use deliberate `files` globs. Scanning every file in a repository can produce slow runs or noisy findings in generated output and test fixtures.

## What stays upstream

Keep Secretlint-specific behavior in Secretlint configuration.

Use ESLint options for:

- Choosing which files ESLint visits.
- Deciding which preset or rule severity to apply.
- Integrating findings into an existing lint job.

Use Secretlint config for:

- Secretlint rule packages.
- Rule-specific options and allow lists.
- Scanner behavior that affects what is considered a secret.

## Related rules

- [`secretlint/secretlint`](../secretlint.md) runs the bridge.
- [`require-secretlint-rules-packages-installed`](../require-secretlint-rules-packages-installed.md) catches missing rule packages.
- [`disallow-secretlint-duplicate-rules`](../disallow-secretlint-duplicate-rules.md) catches repeated rule IDs.
