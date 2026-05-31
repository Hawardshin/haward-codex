# Close And Index Workflow

## Purpose

작업 종료 시 구조 지도를 최신 상태로 유지한다.

## Sequence

1. Run relevant tests or checks.
2. Run `python3 _tools/workspace-index/src/workspace_index.py`.
3. Run `python3 _tools/task-board/src/task_board.py` if coordination status changed.
4. Review generated `_ops/maps/repository-map.md`, `_ops/maps/prompt-map.md`, and `_ops/coordination/board.ko.md`.
5. Summarize completed work and checked references.
6. Confirm the public web search record exists under `_history/web-searches/YYYY/`.
7. Confirm the user request summary exists under `_history/user-requests/YYYY/`.
8. Confirm the active requirements baseline, change, or review record exists under `_requirements/` or the owning project's `docs/requirements/`.
9. Confirm the active spec-driven artifacts exist under `_specs/` or the owning project's `specs/`.
10. Confirm the request-to-outcome trace exists under `_history/request-traces/YYYY/`.
11. Confirm project-specific files stayed inside the owning project folder, or document why the change is shared.
12. Confirm any project registry change is reflected in `_ops/projects/registry.json` and indexes.
13. Confirm any important plan process has been saved under `_history/plans/YYYY/`.
14. If the next session needs a compact handoff, run [_ops/workflows/45-context-archive.md](45-context-archive.md) and confirm `_history/context-archives/YYYY/` was updated.
15. Capture reusable internet research or external references with [_ops/workflows/60-capture-research.md](60-capture-research.md).
16. Run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md) when final outputs contain factual claims.
17. If installation, upgrade, removal, or global environment configuration occurred, run [_ops/workflows/58-installation-record.md](58-installation-record.md) and confirm `_ops/installations/registry.json` plus `_history/installations/YYYY/` were updated.
18. Run the work evaluation loop from [_ops/workflows/40-evaluate-and-rework.md](40-evaluate-and-rework.md).
19. Confirm the evaluation report file exists under `_history/evaluations/YYYY/`.
20. Update `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md` and English companion for important durable context.
21. Update `_history/YYYY/YYYY-MM-DD.md`.
22. Commit the coherent change set.
23. Push to `origin/main`.

## Rule

Any change to root folders, `_ops/prompts/`, `_ops/workflows/`, `_tools/`, `_skills/`, or project structure should refresh the maps.

Meaningful work should leave a scan-friendly summary under `_history/work-summaries/` before close-out.

Meaningful work should leave a public web search record under `_history/web-searches/` before close-out.

Meaningful work should leave a user request summary under `_history/user-requests/` before close-out.

Meaningful work should leave an active requirements target under `_requirements/` or the owning project's `docs/requirements/` before close-out.

Meaningful work should leave active spec-driven artifacts under `_specs/` or the owning project's `specs/` before close-out.

Meaningful work should leave a request-to-outcome trace under `_history/request-traces/` before close-out.

If context was compressed for future resumption, leave a context archive packet under `_history/context-archives/`.

Installation work should leave a detailed audit record under `_history/installations/` and an index entry under `_ops/installations/registry.json`.
