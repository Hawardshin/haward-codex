# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Run [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before planning, repository exploration, or file edits.
2. Check git status.
3. Run [_ops/workflows/01-memory-bootstrap.md](01-memory-bootstrap.md) and read the returned hot memory anchors.
4. Read [_ops/index.md](../index.md).
5. Read the latest relevant request summary under `_history/user-requests/` when the task depends on durable user preferences.
6. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
7. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
8. Read relevant philosophy from `_philosophy/` when the task touches durable worldview or operating principles.
9. Decide the owning project or shared workspace folder; use [_ops/workflows/25-project-boundary-management.md](25-project-boundary-management.md) when unclear.
10. Read the target project README and relevant docs.
11. If planning depends on external facts or current information, run [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md) with `agent-platform/configs/research/research-agent-profile.json`.
12. If the work installs, upgrades, removes, or globally configures software, follow [_ops/workflows/58-installation-record.md](58-installation-record.md).
13. Implement the smallest useful change inside the owning project or shared folder.
14. Verify with tests, checks, or rendered artifacts.
15. If the final output contains factual claims, run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md).
16. If the active conversation has become too long to resume safely from chat, run [_ops/workflows/45-context-archive.md](45-context-archive.md).
17. Evaluate completed work against the initial instruction.
18. Rework if the evaluator finds gaps, then evaluate again.
19. Save or update the public web search record under `_history/web-searches/YYYY/`.
20. Save or update the user request summary under `_history/user-requests/YYYY/`.
21. Update `_history/work-summaries/`, detailed history, and maps.
22. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file.
