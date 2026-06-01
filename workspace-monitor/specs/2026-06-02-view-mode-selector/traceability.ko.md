# 추적성: Workspace Monitor View Mode Selector

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WM-011` | `workspace-monitor/scripts/collect-workspace.mjs` | `npm run collect`, `npm test` |
| `REQ-WM-011` | `workspace-monitor/lib/snapshot.ts` | `npm run check` |
| `REQ-WM-011` | `workspace-monitor/components/MonitorShell.tsx` | `npm run check`, `npm run build` |
| `REQ-WM-011` | `workspace-monitor/app/globals.css` | build와 수동 UI 검토 |
