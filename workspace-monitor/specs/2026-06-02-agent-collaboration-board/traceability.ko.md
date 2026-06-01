# Traceability

| 요구사항 | 산출물 | 검증 |
| --- | --- | --- |
| REQ-WM-013 | `workspace-monitor/scripts/collect-workspace.mjs` | `npm test`, snapshot smoke |
| REQ-WM-013 | `workspace-monitor/lib/snapshot.ts` | `npm run check` |
| REQ-WM-013 | `workspace-monitor/components/MonitorShell.tsx` | `npm run build` |
| REQ-WM-013 | `workspace-monitor/app/globals.css` | responsive build smoke |
| REQ-WM-013 | `workspace-monitor/tests/collector.test.mjs` | `npm test` |

## 근거

- `_history/web-searches/2026/2026-06-02-agent-collaboration-board.ko.md`
- `_research/topics/workspace-monitor/2026-06-02-agent-collaboration-board.ko.md`

## 비고

현재 구현은 정적 snapshot 기반이다. 실시간 실행 trace가 필요해지면 별도 runtime event store와 public/private 표시 정책을 설계해야 한다.
