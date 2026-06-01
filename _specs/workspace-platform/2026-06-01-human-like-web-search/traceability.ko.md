# 추적성: 사람형 웹 검색 강화

| 요구사항 | 구현/문서 | 검증 |
| --- | --- | --- |
| REQ-WS-041 | `agent-platform/configs/research/human-search-profile.json` | `check-config-contract` |
| REQ-WS-041 | `_tools/source-collector/src/source_collector.py` query-plan | source collector tests |
| REQ-WS-041 | `_ops/workflows/54-human-like-source-discovery.md`, `_ops/prompts/84-human-like-source-discovery.md` | workspace index, prompt map |
| REQ-WS-041 | `AGENTS.md`, `_docs/instructions/persistent-instructions.*.md`, memory bootstrap | `check-memory-bootstrap` |
