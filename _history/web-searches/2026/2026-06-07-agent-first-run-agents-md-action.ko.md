# Agent First-Run AGENTS.md Action Web Search

- 날짜: 2026-06-07
- 요청 요약: 에이전트 첫 설정 흐름을 계속 구현하고, 사용자가 실제로 무엇을 해야 하는지 더 명확히 한다.
- 검색어:
  - `OpenAI Codex AGENTS.md official guide initialize project instructions`
  - `OpenAI Codex CLI slash init AGENTS.md official`
- 확인한 출처:
  - OpenAI Codex CLI docs: https://developers.openai.com/codex/cli
  - OpenAI AGENTS.md guide: https://developers.openai.com/codex/guides/agents-md
  - OpenAI Codex introduction: https://openai.com/index/introducing-codex/
- 계획 반영:
  - Codex CLI는 선택한 디렉터리에서 코드를 읽고 수정하며 실행할 수 있으므로, 앱은 먼저 작업공간과 AGENTS.md 지시를 명확히 연결해야 한다.
  - AGENTS.md는 프로젝트 탐색, 테스트 명령, 표준 관행을 전달하는 파일이므로 첫 실행 흐름에서 직접 생성/열기 액션이 필요하다.
- 공개 판단 요약:
  - 이번 작업은 외부 문서를 그대로 복제하지 않고, 공식 개념을 앱의 로컬 첫 설정 액션으로 옮기는 구현이다.
