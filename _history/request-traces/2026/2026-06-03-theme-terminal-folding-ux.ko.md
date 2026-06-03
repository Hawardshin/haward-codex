# Request Trace: Theme, Terminal Overlay, Code Folding UX

## 요청

- 다크모드에서 흰 배경이 많이 보이는 문제를 찾아 고친다.
- 다중 CLI 터미널이 올라올 때 화면을 애매하게 가리지 말고 확실히 덮는다.
- 코드 에디팅 모드에 접기 기능을 추가한다.

## 결과 목표

- 다크/라이트 테마 표면 토큰화.
- 터미널 drawer overlay/backdrop.
- Monaco 코드 접기/펼치기 toolbar.
- Explorer folder collapse.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/WorkspaceExplorerPane.tsx`
- `platform-desktop-app/specs/2026-06-03-theme-terminal-folding-ux/`

## 검증

- `validation.ko.md`와 evaluation record에 기록한다.
