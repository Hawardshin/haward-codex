# Web Search: product split handoff

- 날짜: 2026-06-08
- 요청: Workspace Tracker와 Agent/Tool Operations를 명확히 분리하고, Codex/Claude Code/Cursor/Antigravity 같은 도구를 Git 작업공간 위의 게스트 도구로 다루는 데스크톱 앱 구조를 구현.

## 확인한 출처

- Git 공식 문서, submodules: https://git-scm.com/docs/gitsubmodules
- Git Book, submodules: https://git-scm.com/book/en/v2/Git-Tools-Submodules
- Tauri 공식 문서, frontend에서 Rust command 호출: https://v2.tauri.app/develop/calling-rust/
- OpenAI Codex 공식/Help 문서: https://openai.com/codex/ , https://help.openai.com/en/articles/11369540-codex-in-chatgpt
- Anthropic Claude Code 공식 문서: https://docs.anthropic.com/en/docs/claude-code/getting-started
- Cursor CLI 공식 문서: https://docs.cursor.com/en/cli/using
- Google Antigravity codelab: https://codelabs.developers.google.com/getting-started-google-antigravity

## 계획 영향

- root workspace는 여러 Git 저장소를 기억하는 control plane이고, 각 프로젝트의 실제 작업/배포는 별도 Git 저장소에서 관리한다.
- `platform-desktop-app`는 Git 작업공간, 터미널/게스트 AI 실행, 작업 순서, 근거, 보고서, 결정함에 집중한다.
- `agent-tool-desktop-app`는 agent factory, tool registry, Ollama/local model, provider direct run, AgentCore-style runtime gate를 받는 별도 데스크톱 앱이다.
- Tauri command는 shell string이 아니라 allowlisted app path와 bounded process launch로 별도 앱 handoff를 제공한다.

## 불확실성

- Antigravity 관련 공개 자료는 공식 codelab 외에 비공식 신호가 섞여 있어 제품 세부 주장은 보수적으로 다룬다.
- 이번 구현은 로컬 개발 환경에서 별도 Electron shell을 실행하는 handoff까지 검증한다. 공개 배포용 app-to-app launch, signing, notarization, installer association은 별도 release gate다.
