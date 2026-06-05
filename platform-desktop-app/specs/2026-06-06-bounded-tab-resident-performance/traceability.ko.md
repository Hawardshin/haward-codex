# 추적성: bounded tab resident 성능 보정

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| hidden mounted panel 무제한 증가 금지 | `MonitorShell.tsx` `maxResidentSectionPanels`, `normalizeResidentSectionIds` | `perf:sections`: max resident/mounted 5 |
| source editor 상태 보존 | `retainedResidentSections = ["source"]` | `tool-studio.test.mjs` resident contract |
| heavy data/module prewarm 유지 | `preloadAdminHistoryIndex`, Monaco/3D idle import | `tool-studio.test.mjs`, static server log에서 admin-history fetch 확인 |
| hidden runtime rerender 완화 | `MemoizedDesktopRuntimePanel`, stable callbacks | `workspace-monitor check`, `tool-studio.test.mjs` |
| 자동 build/package | `package:internal` 실행 | `.app`, `.dmg`, codesign verify, hdiutil verify |

## 주요 파일

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/history/useAdminHistoryIndex.ts`
- `platform-desktop-app/renderer/workspace-monitor/scripts/audit-section-switch-latency.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
