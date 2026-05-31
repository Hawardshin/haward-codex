# Start Work Prompt

Use when: 새 작업을 시작하고 현재 저장소 맥락을 빠르게 잡아야 할 때.

## Prompt

```text
Check git status.
Read _ops/index.md and the relevant project README first.
Decide which project or operations folder owns the request.
Persist durable user instructions in _docs/persistent-instructions.md and related operating docs.
Define the smallest useful scope, read only the necessary files, then implement.
```

## Checklist

- `git status --short --branch`
- `_ops/index.md`
- 관련 프로젝트 `README.md`
- `_docs/persistent-instructions.md`
- `_history/YYYY/YYYY-MM-DD.md`
