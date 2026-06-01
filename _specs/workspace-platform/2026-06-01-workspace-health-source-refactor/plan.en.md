# Plan: Workspace Health Source Structure Refactor

## Work Mode

- `standard`

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-01-workspace-health-source-refactor.en.md`
- Requirement: `REQ-WS-034`
- Related prior requirements: `REQ-WS-032`, `REQ-WS-033`

## Language/Runtime Selection

| Option | Pros | Cons | Decision |
| --- | --- | --- | --- |
| Keep Python | Matches existing tools/tests, standard library is enough, suitable for operations CLIs | Limited large CLI framework features | selected |
| Move to Node/TypeScript | Could share some runtime context with `workspace-monitor` | Splits from existing Python tools and adds migration cost | rejected |

## Architecture Selection

| Option | Description | Decision |
| --- | --- | --- |
| Keep single script | Minimal change but keeps CLI, models, execution, and output mixed | rejected |
| Split package modules + legacy wrapper | Clear internal structure while preserving the old command | selected |

## Folder Structure Selection

| Option | Description | Decision |
| --- | --- | --- |
| Keep only `src/workspace_health.py` | Simple, but harder to maintain and import-test as it grows | rejected |
| Use `src/workspace_health/` package plus `src/workspace_health.py` wrapper | Balances maintainability and compatibility | selected |

## Steps

1. Save requirements, spec, and web search records.
2. Split the single script into package modules.
3. Update tests to import the new modules.
4. Document source structure in README files.
5. Verify unit tests, legacy entrypoint, JSON/category output, and full health check.
6. Save evaluation, then commit and push.
