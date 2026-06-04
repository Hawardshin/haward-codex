# 웹 검색 기록: Tool Studio UI/UX/성능 개선

- 날짜: 2026-06-05
- 요청 요지: 속도, 직관성, UI/UX, Agent Core 유사 기능, 툴 제작/배포/Python 환경, 3D 에이전트 협업 UI, 드롭다운/우클릭/단축키 개선

## 검색어

- `2026 React dropdown menu accessible library Radix UI dropdown menu official docs`
- `Three.js official docs React canvas performance dispose animation frame cleanup`
- `Agent builder UI tool creation deployment Python environment dashboard design reference`
- `IntelliJ IDEA UI context menu keyboard shortcuts tool window design reference`

## 확인한 출처

- Radix Dropdown Menu: `https://www.radix-ui.com/primitives/docs/components/dropdown-menu`
- Three.js cleanup manual: `https://threejs.org/manual/en/cleanup.html`
- IntelliJ IDEA keyboard shortcuts: `https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html`
- IntelliJ IDEA Project tool window: `https://www.jetbrains.com/help/idea/project-tool-window.html`

## 판단

- 드롭다운과 우클릭 메뉴는 직접 구현보다 Radix primitives를 쓰는 것이 focus, keyboard navigation, submenu, typeahead를 안정적으로 가져온다.
- IntelliJ류 생산성 UI는 직접 보이는 탭에 모든 기능을 넣기보다 command palette, tool window, context action, shortcut 중심으로 깊이를 탄다.
- 3D 협업 UI는 Three.js로 구현하되 section이 열릴 때만 동적 import하고 unmount 시 geometry/material/renderer/animation frame을 정리해야 탭 전환이 느려지지 않는다.

## 계획 영향

- `tools` section을 새로 추가해 툴 생성/배포/Python venv/툴 전용 관리를 기존 Source/Agents에서 분리한다.
- Radix Dropdown/Context Menu를 Tool Studio의 primary action과 tool item actions에 적용한다.
- Three.js scene은 Tool Studio 내부 canvas에서만 lazy mount하고, 테스트로 static import 금지와 cleanup 코드를 확인한다.
