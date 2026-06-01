# Compress Context Prompt

Use when: 대화가 길어져서 다음 세션이 저장소만 보고 이어갈 수 있게 해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Extract stable requirements, decisions, changed files, and remaining tasks.
Update the relevant project README or docs with the current state.
Summarize the work context in _history/YYYY/YYYY-MM-DD.md.
If the next session would need chat history to resume safely, create a context archive packet under _history/context-archives/YYYY/ using _templates/context-archive/context-archive.ko.md.
Link the packet from _history/work-summaries/YYYY/, _ops/coordination/status.json, and the relevant evaluation report when useful.
Include only stable facts, decisions, open tasks, verification state, must-read files, and source links.
If the information is a durable rule, update _docs/instructions/persistent-instructions.md and AGENTS.md.
Do not preserve temporary reasoning or unnecessary logs.
Do not store raw internal reasoning, sensitive values, or full command logs unless they are required for reproducibility.
When context archiving actually occurs, set context_archiving_occurred=true and context_archive_targets in the work-evaluator input.
```

## Reference

- [_docs/operating-models/context-management.md](../../_docs/operating-models/context-management.md)
- [_docs/policies/context-archive-policy.ko.md](../../_docs/policies/context-archive-policy.ko.md)
- [_history/context-archives/README.ko.md](../../_history/context-archives/README.ko.md)
