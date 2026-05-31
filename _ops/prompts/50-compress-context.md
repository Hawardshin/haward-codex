# Compress Context Prompt

Use when: 대화가 길어져서 다음 세션이 저장소만 보고 이어갈 수 있게 해야 할 때.

## Prompt

```text
Extract stable requirements, decisions, changed files, and remaining tasks.
Update the relevant project README or docs with the current state.
Summarize the work context in _history/YYYY/YYYY-MM-DD.md.
If the information is a durable rule, update _docs/persistent-instructions.md and AGENTS.md.
Do not preserve temporary reasoning or unnecessary logs.
```

## Reference

- [_docs/context-management.md](../../_docs/context-management.md)
