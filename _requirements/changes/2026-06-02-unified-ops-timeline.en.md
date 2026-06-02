# Requirements Change: Unified Ops Timeline

- Change ID: `REQ-CHANGE-2026-06-02-UNIFIED-OPS`
- Related request: `UR-2026-06-02-060`
- Target project: `workspace-monitor/`

## Change

- Add `REQ-WM-018`: merge separated history records, evaluations, web searches, work timings, request traces, collaboration tasks, blockers, and next actions into a `unifiedOps` event stream.

## Reason

- The user directed that history structures and monitoring surfaces should be merged into one.
- Existing drill-downs remain useful, but operators need a single correlated surface for current state and evidence.

## Verification

- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
