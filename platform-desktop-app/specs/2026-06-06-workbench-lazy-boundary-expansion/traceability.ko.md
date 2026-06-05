# 추적: Workbench lazy boundary 확장

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| Heavy panels를 Shell static runtime import에서 제거 | `MonitorShell.tsx`, `AgentBuilderPanels.tsx`, `AgentDetailPanels.tsx` | `tool-studio.test.mjs`, `readiness.test.mjs`, `check-readiness.mjs` |
| Dynamic boundary type safety 유지 | props type exports in feature/workbench components | `workspace-monitor check`, `platform-desktop-app test` |
| Startup prewarm 분산 | `prewarmWorkSurfaces` staggered execution | `perf:sections`, `perf:buttons` |
| 버튼 즉시 feedback 검증 안정화 | `motion.ts`, `audit-button-response.mjs` | `perf:buttons` |
| Customer-safe build/package | customer snapshot build and Tauri package pipeline | `package:internal`, `customer-bundle:audit`, `codesign`, `hdiutil verify` |

## 연결 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-workbench-lazy-boundary-expansion.ko.md`
- 계획: `_history/plans/2026/2026-06-06-workbench-lazy-boundary-expansion.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-workbench-lazy-boundary-expansion.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-workbench-lazy-boundary-expansion.ko.md`
