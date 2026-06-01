# Plan: Human-Like Web Search

## Work Mode

`governance`

## Plan Evidence

- User request: improve web search, find more sources like a human researcher, and summarize good sources.
- Web search record: `_history/web-searches/2026/2026-06-01-human-like-web-search.en.md`
- Existing structure: `source-discovery-registry.json` covers origins; `_tools/source-collector/` covers source bundle normalization.

## Execution Plan

1. Check search-method references.
2. Separate search-origin and search-method responsibilities.
3. Add `human-search-profile.json`.
4. Add `query-plan` to source collector.
5. Connect workflow, prompt, router, policy, persistent instruction, and memory bootstrap.
6. Update requirements, specs, history, and evaluation.
7. Verify, commit, and push.

## Plan Evidence Mapping

- Query operators: Google Search Help/Search Central.
- Search reporting: Cochrane Handbook, PRISMA-S.
- Snowballing: Wohlin paper.
- Source triage: SIFT/lateral reading.
- Local implementation fit: existing `source-discovery-registry.json`, `_tools/source-collector/`.
