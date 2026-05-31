# Reference Source Config References

## Purpose

This note records references for making coding research source criteria and reference catalogs explicit through configuration files.

## Access Date

- 2026-05-31

## Sources Checked

| Source | Type | Key Point | Application |
| --- | --- | --- | --- |
| Zotero Bibliographic Data Formats: https://www.zotero.org/support/dev/data_formats | official docs | Zotero works with formats such as BibTeX, CSL JSON, and RIS. | The reference source catalog can later evolve toward import/export-friendly metadata. |
| Zotero Item Types and Fields: https://www.zotero.org/support/kb/item_types_and_fields | official docs | Reference items include fields such as item type, title, date, DOI, URL, and access date. | `source-registry.json` stores title, URL/path, source_type, last_checked, and used_for. |
| Sourcemeta Registry Configuration: https://registry.sourcemeta.com/configuration/ | official docs | Registry behavior can be managed through configuration files. | `agent-platform/configs/research/` stores the source registry and profile configs. |

## Insights

- Scattered source lists are hard to reuse.
- Actual reviewed sources, source categories, and source-setting configs should be separate fields: `sources_checked`, `source_types`, and `reference_config_paths`.
- Full CSL JSON compatibility can wait; the immediate need is an agent-oriented source registry and research profile config.

## Resulting Application

- Added `agent-platform/configs/research/source-registry.json`.
- Added `agent-platform/configs/research/coding-research-profile.json`.
- Added `reference_config_paths` to `coding-research-agent` input.
- Strengthened readiness checks to require a JSON config path under `agent-platform/configs/research/`.
