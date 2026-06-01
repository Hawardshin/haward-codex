# Traceability

| Requirement | Output | Validation |
| --- | --- | --- |
| REQ-WM-013 | `workspace-monitor/scripts/collect-workspace.mjs` | `npm test`, snapshot smoke |
| REQ-WM-013 | `workspace-monitor/lib/snapshot.ts` | `npm run check` |
| REQ-WM-013 | `workspace-monitor/components/MonitorShell.tsx` | `npm run build` |
| REQ-WM-013 | `workspace-monitor/app/globals.css` | responsive build smoke |
| REQ-WM-013 | `workspace-monitor/tests/collector.test.mjs` | `npm test` |

## Evidence

- `_history/web-searches/2026/2026-06-02-agent-collaboration-board.en.md`
- `_research/topics/workspace-monitor/2026-06-02-agent-collaboration-board.en.md`

## Note

The current implementation is static-snapshot based. If real-time execution traces become necessary, design a separate runtime event store and public/private display policy.
