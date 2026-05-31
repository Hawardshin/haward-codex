# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Run [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before planning, repository exploration, or file edits.
2. Check git status.
3. Run [_ops/workflows/01-memory-bootstrap.md](01-memory-bootstrap.md) and read the returned hot memory anchors.
4. Read [_ops/index.md](../index.md).
5. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
6. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
7. Read relevant philosophy from `_philosophy/` when the task touches durable worldview or operating principles.
8. Decide the owning project or shared workspace folder; use [_ops/workflows/25-project-boundary-management.md](25-project-boundary-management.md) when unclear.
9. Read the target project README and relevant docs.
10. If planning depends on external facts or current information, run [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md) with `agent-platform/configs/research/research-agent-profile.json`.
11. Implement the smallest useful change inside the owning project or shared folder.
12. Verify with tests, checks, or rendered artifacts.
13. If the final output contains factual claims, run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md).
14. Evaluate completed work against the initial instruction.
15. Rework if the evaluator finds gaps, then evaluate again.
16. Update `_history/work-summaries/`, detailed history, and maps.
17. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file.
