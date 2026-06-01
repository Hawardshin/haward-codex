# Requirement Change: Human-Like Web Search

## Background

The user asked for better web search that finds many more sources like a human researcher would, then summarizes useful sources when they are worth reusing.

## Change

- Added `REQ-WS-041`.
- When search quality matters, agents use `human-search-profile.json` for query ladders, operators, source lanes, community/contrary/regional searches, and snowballing.
- Good sources are summarized only when they affect the answer, plan, risk model, source list, or reusable knowledge.

## Impact

- `agent-platform/configs/research/human-search-profile.json` becomes a shared config.
- `_ops/workflows/54-human-like-source-discovery.md` and `_ops/prompts/84-human-like-source-discovery.md` become the search expansion entry points.
- `_tools/source-collector/` provides query-plan generation.
