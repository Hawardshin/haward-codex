# 추적성: 모드와 기능 선택 위치 스위치보드

| 요구사항 | 작업 | 구현 | 검증 |
| --- | --- | --- | --- |
| REQ-WM-019 | T1 | `collectModeFunctionCatalog` | `npm run collect`, collector test |
| REQ-WM-019 | T2 | `WorkspaceModeFunctionCatalog` 타입 | `npm run check` |
| REQ-WM-019 | T3 | `ModeFunctionSwitchboard`, CSS | `npm run build`, static smoke |
| REQ-WM-019 | T4 | readiness 토큰 검사 | `platform-desktop-app test`, `platform-desktop-app run check` |

## 출처

- Apple Human Interface Guidelines: Navigation and Search, Segmented Controls
- Microsoft Fluent 2: Navigation
- WAI-ARIA Authoring Practices: Tabs and Landmarks
