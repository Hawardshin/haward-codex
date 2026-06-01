# Docs Taxonomy And Missing-Document Audit Web Search Record

## Search Information

- Date: 2026-06-01
- Related request: `UR-2026-06-01-014`
- Work mode: `standard`
- Purpose: Check documentation information architecture evidence before designing `_docs/` type-based categories and missing-document validation.

## Queries

- `documentation information architecture docs folder structure taxonomy technical documentation best practices`
- `Diataxis documentation framework tutorial how-to explanation reference official`
- `technical documentation IA docs taxonomy README index structure best practices`
- `documentation discoverability prevent missing docs governance checklist`
- `Diataxis documentation framework official`
- `Google developer documentation style guide documentation types official`
- `GitLab documentation style guide structure topic types official`

## Checked Sources

| Source | Type | What Was Checked | Applied To |
| --- | --- | --- | --- |
| https://diataxis.fr/ | documentation framework | Structuring documentation by user need and document purpose | Evidence for purpose-based `_docs` categories |
| https://docs.gitlab.com/development/documentation/topic_types/ | official docs | Topic types such as concept, task, reference, and troubleshooting | Evidence for separating policies, operating models, instructions, and governance |
| https://developers.google.com/style/ | official style guide | Consistent technical documentation style, structure, links, titles, and examples | Evidence for README indexes and registry-based consistency |

## Weak Sources Ignored

- Generic SEO blogs and vendor marketing pages were not used as main evidence because they were less specific about taxonomy and validation rules.

## Plan Impact

- Split `_docs/` into `instructions`, `policies`, `operating-models`, and `governance` instead of keeping one document dump.
- Add `_docs/registry.json` plus `docs-audit` so missing-document prevention is repeatable.
- Keep the registry self-documenting with `reader_guide`, `reference_links`, `structure_rules`, and `field_guide`.

## Uncertainty

- Diataxis' tutorial/how-to/reference/explanation quadrants were adapted to this repository's operating-document needs instead of copied directly.
- The docs-audit include patterns match the current filename conventions; new document types should update the registry.

## Public Decision Summary

The docs structure should follow the external principle of purpose-based documentation separation, adapted locally as operating instructions, execution policies, operating models, and governance. Missing-document prevention should be enforced by registry plus deterministic audit, not by human memory.
