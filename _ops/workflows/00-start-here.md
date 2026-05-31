# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Run [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before planning, repository exploration, or file edits.
2. Check git status.
3. Run [_ops/workflows/01-memory-bootstrap.md](01-memory-bootstrap.md) and read the returned hot memory anchors.
4. Read [_ops/index.md](../index.md).
5. Read the latest relevant request summary under `_history/user-requests/` and request trace under `_history/request-traces/` when the task depends on durable user preferences or prior outcomes.
6. Read relevant requirements under `_requirements/` or the owning project's `docs/requirements/` when the task changes behavior, rules, structure, capability, or implementation criteria.
7. Read relevant specs under `_specs/` or the owning project's `specs/` when the task changes behavior, rules, structure, capability, or implementation criteria.
8. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
9. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
10. Read relevant philosophy from `_philosophy/` when the task touches durable worldview or operating principles.
11. Decide the owning project or shared workspace folder; use [_ops/workflows/25-project-boundary-management.md](25-project-boundary-management.md) when unclear.
12. Read the target project README and relevant docs.
13. If the request changes behavior, rules, structure, platform capability, or implementation criteria, run [_ops/workflows/35-requirements-lifecycle.md](35-requirements-lifecycle.md) and update requirements before implementation.
14. If meaningful implementation follows, run [_ops/workflows/36-spec-driven-development.md](36-spec-driven-development.md) and update spec, plan, tasks, validation, and traceability artifacts before coding.
15. If planning depends on external facts or current information, run [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md) with `agent-platform/configs/research/research-agent-profile.json`.
16. If the work installs, upgrades, removes, or globally configures software, follow [_ops/workflows/58-installation-record.md](58-installation-record.md).
17. Implement the smallest useful change inside the owning project or shared folder.
18. Verify with tests, checks, or rendered artifacts.
19. If the final output contains factual claims, run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md).
20. If the active conversation has become too long to resume safely from chat, run [_ops/workflows/45-context-archive.md](45-context-archive.md).
21. Evaluate completed work against the initial instruction, active requirements, and active specs.
22. Rework if the evaluator finds gaps, then evaluate again.
23. Save or update the public web search record under `_history/web-searches/YYYY/`.
24. Save or update the user request summary under `_history/user-requests/YYYY/`.
25. Save or update the requirements baseline/change/review under `_requirements/` or the owning project's `docs/requirements/`.
26. Save or update spec-driven artifacts under `_specs/` or the owning project's `specs/`.
27. Save or update the request-to-outcome trace under `_history/request-traces/YYYY/`.
28. Update `_history/work-summaries/`, detailed history, and maps.
29. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file.
