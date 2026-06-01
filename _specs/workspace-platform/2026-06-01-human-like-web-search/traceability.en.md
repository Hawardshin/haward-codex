# Traceability: Human-Like Web Search

| Requirement | Implementation/Docs | Validation |
| --- | --- | --- |
| REQ-WS-041 | `agent-platform/configs/research/human-search-profile.json` | `check-config-contract` |
| REQ-WS-041 | `_tools/source-collector/src/source_collector.py` query-plan | source collector tests |
| REQ-WS-041 | `_ops/workflows/54-human-like-source-discovery.md`, `_ops/prompts/84-human-like-source-discovery.md` | workspace index, prompt map |
| REQ-WS-041 | `AGENTS.md`, `_docs/instructions/persistent-instructions.*.md`, memory bootstrap | `check-memory-bootstrap` |
