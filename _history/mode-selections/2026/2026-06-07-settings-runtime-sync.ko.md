# Work Mode Selection

- 날짜: 2026-06-07
- 모드: `standard`
- 이유:
  - 사용자-facing desktop 설정/동기화 흐름 변경이다.
  - TypeScript UI 상태와 Tauri runtime refresh 흐름을 함께 검증해야 한다.
- 범위:
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/features/AgentFirstRunGuideCard.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/features/DesktopActionFeedbackCard.tsx`
  - 관련 readiness/test 계약.

