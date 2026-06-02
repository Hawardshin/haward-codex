# Traceability: Workspace Monitor Language Mode Selector

| Requirement | Implementation | Validation |
| --- | --- | --- |
| `REQ-WS-072` | `agent-platform/configs/access/language-mode-registry.json` | `check-config-contract` |
| `REQ-WM-015` | `workspace-monitor/scripts/collect-workspace.mjs` | `npm run collect`, `npm test` |
| `REQ-WM-015` | `workspace-monitor/lib/snapshot.ts` | `npm run check` |
| `REQ-WM-015` | `workspace-monitor/components/MonitorShell.tsx` | `npm run check`, `npm run build` |
| `REQ-WM-015` | `workspace-monitor/tests/collector.test.mjs` | `npm test` |
