# Large Scope Decomposition: Unified Action Group UI

## 원 요청 압력

- 사용자는 UI/UX 전반 개선, 버튼, 드롭다운, 탭 이동, 속도, Tool Studio, 에이전트 코어, 3D 협업 장면까지 넓은 범위를 반복 요청했다.

## 이번 slice

- ID: `wm-unified-action-group-ui`
- 목적: 반복 액션 묶음의 구조와 버튼 primitive 사용을 통일한다.
- touch paths:
  - `platform-desktop-app/renderer/workspace-monitor/components/ui/ActionGroup.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - 요구사항/스펙/history 기록

## 제외

- 모든 화면의 전체 action cluster migration
- 새 UI 라이브러리 설치
- generated snapshot 정리
- 기능 실행 로직 변경

## merge gate

- 정적 테스트, 타입체크, check, build, customer build, perf budget, Browser smoke, screenshot smoke, `git diff --check` 통과 후 커밋한다.
