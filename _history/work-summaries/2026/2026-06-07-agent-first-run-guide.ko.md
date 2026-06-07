# Work Summary

- 날짜: 2026-06-07
- 작업: 데스크톱 Quick Start에 에이전트 첫 실행 안내 카드 추가.
- 변경:
  - `AgentFirstRunGuideCard.tsx`를 새 feature 컴포넌트로 추가했다.
  - `MonitorShell.tsx`에서 작업공간, provider, CLI, AGENTS.md, task run 상태를 카드에 연결했다.
  - CSS와 계약 테스트에 첫 실행 안내 토큰을 추가했다.
- 사용자 효과:
  - 사용자는 먼저 작업공간을 고르고, 계정/로컬 모델을 연결하고, CLI를 확인하고, AGENTS.md 규칙을 확인한 뒤 기본 `research-insight-planner-agent`를 시작하는 순서를 한 카드에서 본다.
  - 버튼으로 설정, CLI 확인, 검색 에이전트 시작, 터미널, 실행 기록으로 바로 이동한다.
