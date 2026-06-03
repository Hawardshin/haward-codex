# Traceability: Unified Ops Timeline

| Item | Location |
| --- | --- |
| Requirements | `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md` |
| Spec | `workspace-monitor/specs/2026-06-02-unified-ops-timeline/spec.en.md` |
| Plan | `workspace-monitor/specs/2026-06-02-unified-ops-timeline/plan.en.md` |
| Implementation | `workspace-monitor/scripts/collect-workspace.mjs` |
| Types | `workspace-monitor/lib/snapshot.ts` |
| UI | `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css` |
| Tests | `workspace-monitor/tests/collector.test.mjs`, `platform-desktop-app/tests/readiness.test.mjs` |
| Validation | `workspace-monitor/specs/2026-06-02-unified-ops-timeline/validation.en.md` |
| Web search | `_history/web-searches/2026/2026-06-02-unified-ops-timeline.en.md` |
| Evaluation | `_history/evaluations/2026/2026-06-02-unified-ops-timeline-evaluation-result.json` |

## Requirement Mapping

| Requirement | Implementation | Validation |
| --- | --- | --- |
| `REQ-WM-018` | `unifiedOps` snapshot and `Unified Ops` Overview/History UI | `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, static smoke |
