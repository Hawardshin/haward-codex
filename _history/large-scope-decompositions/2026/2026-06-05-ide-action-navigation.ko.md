# Large Scope Decomposition: IDE Action Navigation

## 요청 압력

- 사용자는 전체 UI/UX, 버튼, 드롭다운, 우클릭, 단축키, 깊은 상세 기능 접근 개선을 요청했다.

## 이번 slice

- ID: `wm-ide-action-navigation`
- 목적: Tool Studio 상세 기능 접근을 IntelliJ식 action access로 바꾼다.
- touch paths:
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - 요구사항/스펙/history 기록

## 제외

- 전체 앱 context menu 일괄 적용
- 새 dependency 설치
- 사용자 keymap 편집기
- generated snapshot 정리

## merge gate

- 정적 테스트, 타입체크, check, build, customer build, perf budget, Browser smoke, `git diff --check` 통과 후 커밋한다.
