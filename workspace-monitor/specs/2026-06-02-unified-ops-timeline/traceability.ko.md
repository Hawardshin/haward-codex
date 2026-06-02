# 추적성: Unified Ops Timeline

| 항목 | 위치 |
| --- | --- |
| 요구사항 | `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md` |
| 스펙 | `workspace-monitor/specs/2026-06-02-unified-ops-timeline/spec.ko.md` |
| 계획 | `workspace-monitor/specs/2026-06-02-unified-ops-timeline/plan.ko.md` |
| 구현 | `workspace-monitor/scripts/collect-workspace.mjs` |
| 타입 | `workspace-monitor/lib/snapshot.ts` |
| UI | `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css` |
| 테스트 | `workspace-monitor/tests/collector.test.mjs`, `platform-desktop-app/tests/readiness.test.mjs` |
| 검증 | `workspace-monitor/specs/2026-06-02-unified-ops-timeline/validation.ko.md` |
| 웹 검색 | `_history/web-searches/2026/2026-06-02-unified-ops-timeline.ko.md` |
| 평가 | `_history/evaluations/2026/2026-06-02-unified-ops-timeline-evaluation-result.json` |

## 요구사항 매핑

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WM-018` | `unifiedOps` snapshot, `Unified Ops` Overview/History UI | `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, static smoke |
