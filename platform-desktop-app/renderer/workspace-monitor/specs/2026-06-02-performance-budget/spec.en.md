# Spec: Workspace Monitor Performance Budget

## Goal

Keep Workspace Monitor initial loading fast as the repository snapshot grows by separating snapshot data from client UI code and validating JavaScript chunk budgets after build.

## Requirements

- `REQ-WM-016`

## Behavior

- `app/page.tsx` renders only `SnapshotLoader` and does not statically import the large snapshot.
- `SnapshotLoader` fetches `workspace-snapshot.json` relative to the current document location and dynamic-imports `MonitorShell` after the snapshot is ready.
- `MonitorShell` handles search text with `useDeferredValue` and skips source-content search unless the Source tab is active.
- `scripts/check-performance-budget.mjs` checks built JavaScript chunk size and prevents both static snapshot import regressions and absolute `/_next` asset path regressions.

## Acceptance Criteria

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- Static server plus Playwright smoke renders the main UI after fetching `workspace-snapshot.json`.

## Non-Goals

- Compressing or sharding the snapshot JSON itself
- Server APIs, databases, or real-time streaming
- A full React component decomposition refactor
