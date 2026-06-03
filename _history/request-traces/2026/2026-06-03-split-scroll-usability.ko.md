# Request Trace: Split Scroll Usability

## 요청

- 스크롤할 때 화면 분할이 잘 되도록 하고, 사용자가 편하게 쓸 수 있게 개선한다.

## 결과 목표

- 파일/코드 split pane 독립 스크롤.
- 터미널 session/output/event 독립 스크롤.
- 설정 content pane 독립 스크롤.
- focusable scroll pane.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/WorkspaceExplorerPane.tsx`
- `platform-desktop-app/specs/2026-06-03-split-scroll-usability/`

## 검증

- `validation.ko.md`와 evaluation record에 기록한다.
