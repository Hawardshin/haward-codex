# 추적성: desktop project management sliced implementation

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-DPMS-001 | `lib/snapshot.ts`, `scripts/collect-workspace.mjs`, `ProjectManagementMetrics.tsx`, `ProjectPortfolioList.tsx` | `tests/collector.test.mjs`, `pnpm run check` |
| REQ-DPMS-002 | `actionQueue`, `ProjectDetailPanel.tsx`, `openProjectManagementTarget` | `tests/tool-studio.test.mjs`, Browser smoke |
| REQ-DPMS-003 | `reportBundle`, `ProjectDetailPanel.tsx` | `tests/collector.test.mjs`, Browser smoke |
| REQ-DPMS-004 | `components/features/project-management/` | `wc -l`, `tsc --noEmit` |
| REQ-DPMS-005 | `MonitorShell.tsx` | `tests/tool-studio.test.mjs` |
| REQ-DPMS-006 | `sanitizeProjectManagementForCustomer` | `tests/collector.test.mjs` |

## 증거 파일

- `_history/web-searches/2026/2026-06-08-desktop-project-management-sliced-implementation.ko.md`
- `_history/large-scope-decompositions/2026/2026-06-08-desktop-project-management-sliced-implementation.json`
- `_history/coding-research/2026/2026-06-08-desktop-project-management-sliced-implementation.json`
- `_history/evaluations/2026/2026-06-08-desktop-project-management-sliced-implementation-evaluation-input.json`
