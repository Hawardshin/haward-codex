# Traceability

## Request

- `UR-2026-06-02-005`: The user asked to visualize which agents exist and visualize history.

## Requirements

- `REQ-WM-009`
- `REQ-WM-010`

## Implementation Files

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/src/generated/workspace-snapshot.json`
- `workspace-monitor/public/workspace-snapshot.json`

## Validation

- `npm test`
- `npm run check`
- `npm run collect`
- `npm run build`
- browser/Playwright smoke check
