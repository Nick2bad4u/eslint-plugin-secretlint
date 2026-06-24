# Rule overview

`eslint-plugin-secretlint` brings Secretlint findings into the ESLint run you already use for editors, CI, and pull-request checks. The bridge rule runs Secretlint over text input, while the config-authoring rules keep common Secretlint config policy close to the rest of your flat config.

## What belongs here

Use this plugin when secret-detection findings should appear beside normal ESLint diagnostics. The plugin does not recreate Secretlint's rule engine, preset system, or masking behavior. It delegates scanning to Secretlint and translates the reported messages into ESLint reports.

## Recommended path

Start with `secretlint.configs.recommended` for normal Secretlint diagnostics. Add `secretlint.configs.configuration` when a repository has a Secretlint config file and you want ESLint to enforce rule IDs, rule object shape, package availability, known properties, and consistent nested rule arrays.

## Rule groups

| Group              | Use it for                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| Bridge diagnostics | Run Secretlint over source text and surface native findings through ESLint.                      |
| Config shape       | Catch missing rule IDs, unknown rule properties, and unsupported config filenames.               |
| Config consistency | Reject duplicate rules, empty rule IDs, relative rule paths, and brittle allow-message settings. |

## Upstream options

Pass upstream behavior through the bridge rule options instead of duplicating Secretlint configuration in ESLint. Use the Secretlint config file for Secretlint-specific scanning policy, and use this plugin's config rules for repository conventions around that config file.
