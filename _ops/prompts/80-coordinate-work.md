# Coordinate Work Prompt

Use when: 진행 중인 에이전트와 병렬 작업을 한 곳에서 확인하거나 갱신해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Review _ops/coordination/status.json before changing parallel work.
Update agents, tasks, blockers, next actions, references, and evaluation report paths when work status changes.
Regenerate the coordination boards with python3 _tools/task-board/src/task_board.py.
Use _ops/coordination/board.ko.md or board.html as the primary view of active work.
If a task is complete, mark it completed and link its evaluation report before closing.
```

## References

- [_ops/coordination/README.ko.md](../coordination/README.ko.md)
- [_tools/task-board/README.ko.md](../../_tools/task-board/README.ko.md)
