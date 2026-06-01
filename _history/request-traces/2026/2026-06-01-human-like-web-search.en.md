# Request Trace: Human-Like Web Search

## Request

Improve web search so it finds more sources like a human researcher would and summarizes good sources.

## Work Mode

`governance`

## Requirement

- `REQ-WS-041`

## Result

- Added the search-method profile `human-search-profile.json`.
- Split responsibilities: `source-discovery-registry.json` defines where to search; `human-search-profile.json` defines how to search.
- Added a `query-plan` command to source collector for repeatable search planning.
- Connected workflow, prompt, router, source collection policy, persistent instructions, and memory bootstrap.
- Made good-source summaries selective based on reuse value and plan impact.

## Artifacts

- `agent-platform/configs/research/human-search-profile.json`
- `_ops/workflows/54-human-like-source-discovery.md`
- `_ops/prompts/84-human-like-source-discovery.md`
- `_tools/source-collector/src/source_collector.py`
- `_research/topics/agent-planning/2026-06-01-human-like-web-search.en.md`
- `_research/topics/agent-planning/2026-06-01-human-like-web-search-query-plan.en.md`
- `_specs/workspace-platform/2026-06-01-human-like-web-search/`

## Verification

- source collector tests
- config contract
- memory bootstrap
- workspace index/task board
- grounding/evaluation

## Evaluation

- Evaluation file: `_history/evaluations/2026/2026-06-01-human-like-web-search.en.md`
- Timing record: `_history/work-timings/2026/2026-06-01-human-like-web-search.json`
