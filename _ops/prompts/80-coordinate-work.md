# Coordinate Work Prompt

Use when: 진행 중인 에이전트와 병렬 작업을 한 곳에서 확인하거나 갱신해야 할 때.

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
