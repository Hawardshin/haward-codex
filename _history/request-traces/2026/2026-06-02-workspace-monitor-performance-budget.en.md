# Request Trace: Workspace Monitor Performance Budget

## Request

- ID: `UR-2026-06-02-052`
- Summary: The user asked to analyze the code broadly, improve speed, and keep it fast.

## Result

- Removed the large snapshot static import.
- Added `/workspace-snapshot.json` fetch-based `SnapshotLoader`.
- Load `MonitorShell` through dynamic import.
- Use `useDeferredValue` for search input processing.
- Skip source-content search outside the Source tab.
- Added the `npm run perf:budget` regression check.

## Requirement

- `REQ-WM-016`

## Artifacts

- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/scripts/check-performance-budget.mjs`
- `workspace-monitor/specs/2026-06-02-performance-budget/`
- `_research/topics/workspace-monitor/2026-06-02-performance-budget.en.md`

## Verification

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- Static Playwright smoke
