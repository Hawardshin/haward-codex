# Start Work Prompt

Use when: 새 작업을 시작하고 현재 저장소 맥락을 빠르게 잡아야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Run web search for the user instruction before planning, repository exploration, or file edits.
Check git status.
Run check-memory-bootstrap using agent-platform/configs/memory/bootstrap-manifest.json and read the returned hot_context_paths.
Read agent-platform/configs/workflows/work-mode-registry.json and select work_mode: quick, standard, ship_first, research, or governance.
Read _ops/index.md and the relevant project README first.
Decide which project or operations folder owns the request.
If ownership is unclear, run the project boundary prompt before editing.
Persist durable user instructions in _docs/instructions/persistent-instructions.md and related operating docs.
Define the smallest useful scope for the selected work_mode, read only the necessary files, then implement.
If ship_first defers non-blocking improvement work, record the deferred target before close-out.
```

## Checklist

- `git status --short --branch`
- `_ops/workflows/05-web-first-intake.md`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `_ops/workflows/02-select-work-mode.md`
- `agent-platform/configs/workflows/work-mode-registry.json`
- `_ops/index.md`
- 관련 프로젝트 `README.md`
- `_docs/instructions/persistent-instructions.md`
- `_history/YYYY/YYYY-MM-DD.md`
