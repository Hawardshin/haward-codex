# Work Summary

- `ProviderAccountsPanel`의 setup guide를 접을 수 있게 바꾸고, `키 발급`, `모델`, `구독`, `갱신`처럼 짧은 액션 라벨을 사용했다.
- `RuntimeDataSupportPanel`은 루트 목록을 6개로 제한하고 남은 개수를 요약한다.
- `DesktopControlPanel`, `WorkspaceHostPanel`, `SearchAgentWorkChatPanel`, `AgentFirstRunGuideCard`, `RuntimeInitStatusCard`, 설정 quick/adapter 액션의 긴 버튼 라벨을 줄였다.
- `globals.css`에 주요 버튼 max width와 ellipsis 계약을 추가했다.
- `tool-studio.test.mjs`, `readiness.test.mjs`, `check-readiness.mjs`의 UI 계약을 새 짧은 라벨 기준으로 업데이트했다.
- `desktop:package:internal`이 최종 통과해 `.app`와 `.dmg`가 생성됐다.
