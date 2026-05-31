# Research Configs

This folder stores configuration files that make source criteria and reference catalogs explicit for agents.

## Files

- `source-registry.json`: source type taxonomy and reusable reference source catalog
- `coding-research-profile.json`: default source coverage profile used by `coding-research-agent` before implementation

## Usage Rules

- Coding research input must include `reference_config_paths`.
- At least one path must point to a JSON config under `agent-platform/configs/research/`.
- `source_types` should use the source types defined in `source-registry.json`.
- External reference sources should update `last_checked` or be added as new config entries.
- Internal knowledge-base entries should pass `knowledge-skeptic-agent` before use as evidence.
- Shared settings files should include `reader_guide`, `reference_links`, `structure_rules`, and `field_guide`.
- After changing settings, run `check-config-contract` to confirm the file explains itself.

## Default Input Example

```json
{
  "reference_config_paths": [
    "agent-platform/configs/research/source-registry.json",
    "agent-platform/configs/research/coding-research-profile.json"
  ],
  "source_types": [
    "official",
    "open_source",
    "tech_blog",
    "community"
  ]
}
```
