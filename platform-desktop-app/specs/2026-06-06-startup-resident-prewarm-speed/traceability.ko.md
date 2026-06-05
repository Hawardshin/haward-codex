# 추적성: startup resident prewarm 속도 최적화

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| 핵심 탭 startup prewarm | `MonitorShell.tsx`의 `startupResidentPreloadSections`, `residentStartupPreloadDoneRef`, idle preload effect | `tool-studio.test.mjs`, `perf:sections` |
| resident cap 유지 | `normalizeResidentSectionIds()`와 max 5 cap 유지 | `perf:sections maxObservedResidentCount=5`, `maxObservedMountedPanelCount=5` |
| overview retention 제외 | `nonRetainedResidentSections = ["overview"]` | `tool-studio.test.mjs` resident contract |
| Tool Studio rerender 감소 | `MemoizedToolStudioPanel`, stable `openAgentsSection`, `openSourceSection`, `openProviderSettings` | `tool-studio.test.mjs`, workspace-monitor test |
| 자동 빌드/패키징 | renderer build, desktop package pipeline | `validation.ko.md` |

## 관련 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-startup-resident-prewarm-speed.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-startup-resident-prewarm-speed.ko.md`
- 계획: `_history/plans/2026/2026-06-06-startup-resident-prewarm-speed.ko.md`
- 검증: `platform-desktop-app/specs/2026-06-06-startup-resident-prewarm-speed/validation.ko.md`
