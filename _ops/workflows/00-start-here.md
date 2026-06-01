# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Run [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before planning, repository exploration, or file edits.
2. Check git status.
3. Run [_ops/workflows/01-memory-bootstrap.md](01-memory-bootstrap.md) and read the returned hot memory anchors.
4. Run [_ops/workflows/02-select-work-mode.md](02-select-work-mode.md) and record one `work_mode`: `quick`, `standard`, `ship_first`, `research`, or `governance`.
5. Start or reserve a timing record with [_ops/workflows/42-record-work-timing.md](42-record-work-timing.md) for meaningful work.
6. Read [_ops/index.md](../index.md).
7. Read the latest relevant request summary under `_history/user-requests/` and request trace under `_history/request-traces/` when the selected mode or task depends on durable user preferences or prior outcomes.
8. Read relevant requirements under `_requirements/` or the owning project's `docs/requirements/` when the task changes behavior, rules, structure, capability, implementation criteria, or uses `standard`/`governance` mode.
9. Read relevant specs under `_specs/` or the owning project's `specs/` when the task changes behavior, rules, structure, capability, implementation criteria, or uses `standard`/`governance` mode.
10. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
11. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
12. Read relevant philosophy from `_philosophy/` when the task touches durable worldview or operating principles.
13. Decide the owning project or shared workspace folder; use [_ops/workflows/25-project-boundary-management.md](25-project-boundary-management.md) when unclear.
14. Read the target project README and relevant docs.
15. If the request changes behavior, rules, structure, platform capability, or implementation criteria, run [_ops/workflows/35-requirements-lifecycle.md](35-requirements-lifecycle.md) unless `ship_first` explicitly defers the backfill to `_ops/backlog/`.
16. If meaningful implementation follows, run [_ops/workflows/36-spec-driven-development.md](36-spec-driven-development.md) unless `quick` mode is sufficient or `ship_first` explicitly defers the spec backfill.
17. If active specs are ambiguous or differ from current source, tests, generated artifacts, or validation output, run [_ops/workflows/38-spec-source-reconciliation.md](38-spec-source-reconciliation.md) before changing either spec or source.
18. If speed matters or work can be split into independent lanes, run [_ops/workflows/52-parallel-work-planning.md](52-parallel-work-planning.md), record dependencies and touch paths, and update coordination status before parallel execution.
19. If source-code implementation follows, run [_ops/workflows/56-coding-research.md](56-coding-research.md) and record code references plus architecture references, at least two architecture options, and decision notes.
20. If the work creates, updates, validates, installs, or improves a custom skill, run [_ops/workflows/37-skill-lifecycle.md](37-skill-lifecycle.md).
21. If planning depends on external facts or current information, run [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md) with `agent-platform/configs/research/research-agent-profile.json`.
22. If the work installs, upgrades, removes, or globally configures software, follow [_ops/workflows/58-installation-record.md](58-installation-record.md).
23. Implement the smallest useful change inside the owning project or shared folder.
24. Verify with tests, checks, or rendered artifacts.
25. If the final output contains factual claims, run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md).
26. If the active conversation has become too long to resume safely from chat, run [_ops/workflows/45-context-archive.md](45-context-archive.md).
27. Update and validate the timing record with [_ops/workflows/42-record-work-timing.md](42-record-work-timing.md).
28. Evaluate completed work using the selected `work_mode` against the initial instruction and the artifacts required by that mode.
29. Rework if the evaluator finds blocking gaps, then evaluate again.
30. Save or update the public web search record under `_history/web-searches/YYYY/` when required by the selected mode or when the search produced reusable insight.
31. Save or update the user request summary under `_history/user-requests/YYYY/` when required by the selected mode or when the request changes durable state.
32. Save or update the requirements baseline/change/review under `_requirements/` or the owning project's `docs/requirements/` when required by the selected mode or when durable behavior changes.
33. Save or update spec-driven artifacts under `_specs/` or the owning project's `specs/` when required by the selected mode or when implementation scope is durable.
34. If skill work occurred, save or update `_skills/` source, validation, and improvement records.
35. Save or update the request-to-outcome trace under `_history/request-traces/YYYY/` when required by the selected mode or when the request is meaningful durable work.
36. Update `_history/work-summaries/`, `_history/work-timings/`, detailed history, and maps when required by the selected mode or when the navigation/history layer changed.
37. For `ship_first`, update `_ops/backlog/deferred-improvements.ko.md` if non-blocking improvements were intentionally postponed.
38. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file or introduce a more precise work-mode rule.
