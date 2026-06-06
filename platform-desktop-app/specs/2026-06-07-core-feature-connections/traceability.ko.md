# Traceability: Core Feature Connections

날짜: 2026-06-07

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| 홈 주요 기능이 실제 작업 흐름으로 연결되어야 한다 | `MonitorShell.tsx` `homeMainFeatures` connection 배열 | renderer test, Browser smoke |
| 연결은 섹션뿐 아니라 단계까지 선택해야 한다 | `selectIntentStep`, `selectToolStep` | static test route contract |
| Tool Studio 연결은 mode를 함께 전달해야 한다 | `setRequestedToolMode` helper | static test `requestedMode`/helper contract |
| 연결 UI는 핵심 기능 상세에 표시되어야 한다 | `CoreFeatureDrilldown.tsx` connection button render | static test DOM contract |
| 반응형 UI가 기존 홈 구조와 맞아야 한다 | `globals.css` `.main-feature-connections` | CSS contract test, Browser smoke |

## 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-07-core-feature-connections.ko.md`
- 계획: `platform-desktop-app/specs/2026-06-07-core-feature-connections/plan.ko.md`
- 검증: `platform-desktop-app/specs/2026-06-07-core-feature-connections/validation.ko.md`
- 평가: `_history/evaluations/2026/2026-06-07-core-feature-connections.ko.md`
