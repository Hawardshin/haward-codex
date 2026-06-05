# 작업 요약: Unified Action Group UI

- `components/ui/ActionGroup.tsx`를 추가해 반복 액션 묶음의 align, density, direction, wrap, role 규칙을 공통화했다.
- titlebar, task handoff, command palette, Tool Studio 대표 액션을 Button/ActionGroup primitive 구조로 migration했다.
- 720px/860px 이하에서 action group이 부모 폭을 채우고 버튼이 overflow 없이 접히도록 CSS를 보강했다.
- 정적 테스트와 desktop/mobile Browser smoke에서 대표 action group, command palette primitive button, task handoff action group, overflowX 0을 확인했다.
- 스크린샷 artifact:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-unified-action-group-ui-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-unified-action-group-ui-mobile.png`
