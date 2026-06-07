# Work mode: model and scene split

- 날짜: 2026-06-08
- 선택 mode: `standard`
- 이유: 사용자가 deferred 구현을 계속 요구했고, `platform-desktop-app`의 의미 있는 구조 refactor와 build 검증이 필요하다.
- view_mode: `superadmin_developer`
- install_mode: `developer`

## Scope

`platform-desktop-app/renderer/workspace-monitor`의 500줄 초과 `snapshot.ts`, `desktop.ts`, `ToolStudioPanel.tsx`를 우선 줄인다.
