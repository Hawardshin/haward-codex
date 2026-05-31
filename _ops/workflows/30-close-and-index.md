# Close And Index Workflow

## Purpose

작업 종료 시 구조 지도를 최신 상태로 유지한다.

## Sequence

1. Run relevant tests or checks.
2. Run `python3 _tools/workspace-index/src/workspace_index.py`.
3. Run `python3 _tools/task-board/src/task_board.py` if coordination status changed.
4. Review generated `_ops/maps/repository-map.md`, `_ops/maps/prompt-map.md`, and `_ops/coordination/board.ko.md`.
5. Summarize completed work and checked references.
6. Run the work evaluation loop from [_ops/workflows/40-evaluate-and-rework.md](40-evaluate-and-rework.md).
7. Confirm the evaluation report file exists under `_history/evaluations/YYYY/`.
8. Update `_history/YYYY/YYYY-MM-DD.md`.
9. Commit the coherent change set.
10. Push to `origin/main`.

## Rule

Any change to root folders, `_ops/prompts/`, `_ops/workflows/`, `_tools/`, `_skills/`, or project structure should refresh the maps.
