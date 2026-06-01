# Plan: Whole Workspace Improvement

## Related Request

- `UR-2026-06-01-016`

## Work Mode

- `governance`

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-01-whole-workspace-improvement.en.md`
- Local audits:
  - `docs-audit`: `docs_ready`
  - `structure-audit`: `clean`
  - core config contract: `self_documenting`
  - memory bootstrap: `ready_to_bootstrap`

## Improvement Found

- `repository-map.md` showed some root folders with generic purposes instead of using the existing root structure policy and project registry.
- Workspace health checks were split across several commands.

## Execution Plan

1. Make `workspace-index` read root structure policy and project registry.
2. Add class/source columns to the repository map root folder table.
3. Add `workspace-health` to bundle core audits and tests.
4. Record requirements, specs, traces, summaries, and evaluation.
5. Verify the full health command and optional build.

## Parallelization Decision

- Do not parallelize implementation because this touches shared navigation/history files and git state.
