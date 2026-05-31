# Self-Documenting Config References

## Purpose

Record the rationale for keeping reference links, structural rules, and field explanations inside important settings files.

## Access Date

- 2026-05-31

## Sources Checked

| Source | Type | Key Point | Application |
| --- | --- | --- | --- |
| JSON Schema Annotations: https://json-schema.org/understanding-json-schema/reference/annotations | Official docs | Annotation keywords such as `title`, `description`, `default`, and `examples` provide explanatory metadata and help schemas become self-documenting. | Add explanatory metadata such as `reader_guide` and `field_guide` directly to configs. |
| Azure App Configuration best practices: https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices | Official docs | Configuration as Code keeps config in source control and can include validation/testing steps. | Validate shared settings with `check-config-contract`. |
| The Twelve-Factor App Config: https://www.12factor.net/config | Methodology | Separating config from code helps manage deploy-specific values and avoid scattered config. | Keep operating-rule settings separate from code, tracked in git, and explained in the file. |

## Insights

- A value-only settings file loses rationale over time.
- Putting references and structure rules inside the settings file lets the user understand the decision by opening one file.
- Separate docs can drift, so important configs should carry `reference_links`, `structure_rules`, and `field_guide` in the file itself.
- Repeated checks should be automated with a CLI.

## Applied Result

- Added the `check-config-contract` CLI.
- Added `config-contract-agent`.
- Added `reader_guide`, `reference_links`, `structure_rules`, and `field_guide` to three core config files.
- Added the self-documenting config policy.
