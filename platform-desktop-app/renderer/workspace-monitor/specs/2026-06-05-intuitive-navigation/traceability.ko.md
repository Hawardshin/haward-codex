# 추적성

| 요청/요구 | 구현 | 검증 |
| --- | --- | --- |
| 직관성 개선 | `MonitorShell.tsx` `TaskIntentItem`, Overview `data-task-intent`, command palette goal items | `tool-studio.test.mjs`, Browser smoke |
| 모바일에서 목표 선택 우선 | `data-active-section`, `globals.css` 모바일 Overview compact 규칙 | 390px screenshot/smoke |
| 텍스트 깨짐 방지 | `task-intent-grid` 2-line clamp, stable grid columns | screenshot visual check, overflow 0 |
