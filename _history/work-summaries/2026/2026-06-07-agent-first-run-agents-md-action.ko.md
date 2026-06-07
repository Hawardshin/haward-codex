# Work Summary

- 날짜: 2026-06-07
- 작업: 에이전트 첫 실행 카드에 `AGENTS.md` 생성/열기 액션 추가.
- 변경:
  - `AgentFirstRunGuideCard`에 `AGENTS.md 만들기/열기` 버튼 추가.
  - `prepareAgentsInstructions` 액션을 추가해 기존 파일을 열거나 루트 `AGENTS.md` 시작 템플릿을 생성.
  - 생성된 파일은 Source 편집기에 바로 열린다.
  - `prepare-agents-md` 액션 피드백과 계약 테스트를 추가.
- 사용자 효과:
  - 사용자는 `/init`이나 파일 위치를 기억하지 않아도 첫 설정 파일을 만들고 편집할 수 있다.
