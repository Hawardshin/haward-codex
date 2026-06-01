# Plan History: Coding Research Reference Configs

## Initial Request

- "Do not keep it simple; set it up with config files so it is clear what I am referencing."

## Plan Objective

- Make coding research record which source registry and research profile it used.
- Prevent `coding-research-agent` from returning implementation-ready unless those config paths are recorded.

## Search Questions

- What reference metadata formats help make source records reusable?
- How should a configuration-driven registry pattern apply here?

## Search Channels

- Web search
- Repository search
- Code search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Zotero Bibliographic Data Formats | https://www.zotero.org/support/dev/data_formats | Reference metadata formats such as CSL JSON and BibTeX |
| Zotero Item Types and Fields | https://www.zotero.org/support/kb/item_types_and_fields | Item type, URL, DOI, and access-date field modeling |
| Sourcemeta Registry Configuration | https://registry.sourcemeta.com/configuration/ | Configuration-driven registry pattern |
| Existing coding research implementation | `agent-platform/src/agent_platform/planning/coding_research.py` | Readiness check extension point |
| Existing source collection policy | `_docs/policies/source-collection-policy.en.md` | Source type and adoption signal policy |

## Knowledge-Base Validation

- Internal implementation and policy are reused, so final verification will run `knowledge-skeptic-agent`.

## Insights

- `sources_checked` records actual sources reviewed, while `source_types` records category coverage.
- The user's request for explicit reference settings needs separate `reference_config_paths` and config files.
- The source registry should hold both source type taxonomy and reusable reference source catalog.
- The coding research profile should define minimum coverage and default reference source IDs.

## Plan Steps

- Add `agent-platform/configs/research/source-registry.json`.
- Add `agent-platform/configs/research/coding-research-profile.json`.
- Add `reference_config_paths` to `CodingResearchInput`.
- Require a JSON config path under `agent-platform/configs/research/` in readiness checks.
- Update templates, tests, docs, prompts, workflows, and persistent instructions.
- Save evaluation reports and history, verify, commit, and push.

## Rejected Or Deferred Options

- Full Zotero or CSL JSON compatibility was deferred. The immediate need is an agent-oriented source registry and research profile config.

## Risks And Unknowns

- The current readiness check validates that a config path points to the research config folder. Full schema validation can be promoted into a separate validator later.

## Validation Method

- `agent-platform` unit tests
- `complete-coding-research` CLI
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- map/board checks and `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Add `reference_config_paths` and configs under `configs/research/` | Track source criteria through configuration instead of implicit docs |
