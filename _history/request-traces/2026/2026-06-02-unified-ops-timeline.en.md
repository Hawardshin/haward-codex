# Request Trace: Unified Ops Timeline

## Request

- Merge history structures and monitoring surfaces into one.

## Result

- Added `unifiedOps` to the `workspace-monitor` snapshot.
- Added `Unified Ops` panels to Overview and History.
- Reinforced collector/readiness tests.
- Added `REQ-WM-018` and `workspace-monitor/specs/2026-06-02-unified-ops-timeline/`.

## Artifacts

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/specs/2026-06-02-unified-ops-timeline/`

## Verification

- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- Static server smoke
