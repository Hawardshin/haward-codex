# Close And Index Workflow

## Purpose

작업 종료 시 구조 지도를 최신 상태로 유지한다.

## Sequence

1. Run relevant tests or checks.
2. Run `python3 _tools/workspace-index/src/workspace_index.py`.
3. Run `python3 _tools/task-board/src/task_board.py` if coordination status changed.
4. Review generated `_ops/maps/repository-map.md`, `_ops/maps/prompt-map.md`, and `_ops/coordination/board.ko.md`.
5. Summarize completed work and checked references.
6. Confirm project-specific files stayed inside the owning project folder, or document why the change is shared.
7. Confirm any project registry change is reflected in `_ops/projects/registry.json` and indexes.
8. Confirm any important plan process has been saved under `_history/plans/YYYY/`.
9. Capture reusable internet research or external references with [_ops/workflows/60-capture-research.md](60-capture-research.md).
10. Run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md) when final outputs contain factual claims.
11. Run the work evaluation loop from [_ops/workflows/40-evaluate-and-rework.md](40-evaluate-and-rework.md).
12. Confirm the evaluation report file exists under `_history/evaluations/YYYY/`.
13. Update `_history/YYYY/YYYY-MM-DD.md`.
14. Commit the coherent change set.
15. Push to `origin/main`.

## Rule

Any change to root folders, `_ops/prompts/`, `_ops/workflows/`, `_tools/`, `_skills/`, or project structure should refresh the maps.
