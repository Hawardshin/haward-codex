# Coordinate Parallel Work Workflow

## Purpose

진행 중인 에이전트와 병렬 작업을 한 곳에서 보고, 상태가 바뀔 때 같은 방식으로 갱신한다.

## Sequence

1. Open `_ops/coordination/status.json`.
2. Add or update the agent entry.
3. Add or update the task entry.
4. Record blockers, next action, references, and evaluation report path.
5. Run `python3 _tools/task-board/src/task_board.py`.
6. Review `_ops/coordination/board.ko.md` or `_ops/coordination/board.html`.
7. Run `python3 _tools/task-board/src/task_board.py --check`.

## Rule

If more than one agent, thread, or task is active, update the coordination board before continuing work.
