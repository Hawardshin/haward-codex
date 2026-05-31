# Close And Index Workflow

## Purpose

작업 종료 시 구조 지도를 최신 상태로 유지한다.

## Sequence

1. Run relevant tests or checks.
2. Run `python3 _tools/workspace-index/src/workspace_index.py`.
3. Review generated `_ops/maps/repository-map.md` and `_ops/maps/prompt-map.md`.
4. Summarize completed work and checked references.
5. Run the work evaluation loop from [_ops/workflows/40-evaluate-and-rework.md](40-evaluate-and-rework.md).
6. Confirm the evaluation report file exists under `_history/evaluations/YYYY/`.
7. Update `_history/YYYY/YYYY-MM-DD.md`.
8. Commit the coherent change set.
9. Push to `origin/main`.

## Rule

Any change to root folders, `_ops/prompts/`, `_ops/workflows/`, `_tools/`, `_skills/`, or project structure should refresh the maps.
