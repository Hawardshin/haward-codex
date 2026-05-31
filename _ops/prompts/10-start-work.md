# Start Work Prompt

Use when: 새 작업을 시작하고 현재 저장소 맥락을 빠르게 잡아야 할 때.

## Prompt

```text
Run web search for the user instruction before planning, repository exploration, or file edits.
Check git status.
Run check-memory-bootstrap using agent-platform/configs/memory/bootstrap-manifest.json and read the returned hot_context_paths.
Read _ops/index.md and the relevant project README first.
Decide which project or operations folder owns the request.
If ownership is unclear, run the project boundary prompt before editing.
Persist durable user instructions in _docs/persistent-instructions.md and related operating docs.
Define the smallest useful scope, read only the necessary files, then implement.
```

## Checklist

- `git status --short --branch`
- `_ops/workflows/05-web-first-intake.md`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `_ops/index.md`
- 관련 프로젝트 `README.md`
- `_docs/persistent-instructions.md`
- `_history/YYYY/YYYY-MM-DD.md`
