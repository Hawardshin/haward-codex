# Spec: Chatbot Connection

날짜: 2026-06-07

## 목적

Workspace Monitor의 에이전트 채팅을 실제 실행 연결면으로 보이게 한다. 사용자는 채팅이 어떤 모델 API, 모델 라우팅, 터미널 fallback, 작업 실행 저장소와 이어지는지 한 화면에서 확인하고 필요한 설정으로 즉시 이동해야 한다.

## 동작

1. `SearchAgentWorkChatPanel`은 `data-chatbot-surface="search-agent"`를 가진다.
2. composer 안에는 `data-chatbot-connection="search-agent"` 연결 스트립을 렌더링한다.
3. 연결 스트립은 다음 네 항목을 표시한다.
   - `provider-api`: 선택 provider가 configured 또는 local HTTP이면 연결됨, 아니면 연결 필요.
   - `model-route`: 현재 route decision의 tier, model, constraint.
   - `terminal-fallback`: native provider 실행이 없거나 실패할 때 이어지는 CLI 세션 경로.
   - `task-run-store`: provider 응답과 실행 로그가 작업 실행 저장소에 남는 경로.
4. 연결 스트립은 `계정 연결`, `터미널 연결`, `모델 갱신` 액션을 제공한다.
5. `계정 연결`은 기존 execution provider 설정을 연다.
6. `터미널 연결`은 기존 terminal drawer를 연다.
7. `모델 갱신`은 선택 provider의 모델 catalog refresh를 실행한다.
8. 명령 팔레트에는 `connect-chatbot` 항목을 추가하고 `챗봇`, `채팅`, `연결`, `provider`, `terminal`, `task run` 검색어를 연결한다.

## 실행 경계

- 기존 Rust `run_provider_agent_task` command를 재사용한다.
- 기존 CLI fallback command인 `start_cli_adapter_session`을 재사용한다.
- 새 native command, 새 secret store, 새 external dependency를 추가하지 않는다.

## UX 경계

- 연결 상태는 채팅 입력과 실행 버튼 사이에서 사용자가 실행 전 확인할 수 있어야 한다.
- 상태 항목은 고정 폭 카드가 아니라 반응형 grid로 줄바꿈한다.
- 주요 액션은 icon과 짧은 label을 함께 사용한다.
- 한국어 UI에는 `task-run store에` 같은 혼용 문구를 쓰지 않는다.

## 참고

- OpenAI Agents SDK Agents: https://openai.github.io/openai-agents-js/guides/agents/
- OpenAI Agents SDK Tools: https://openai.github.io/openai-agents-js/guides/tools/
- Tauri Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
- VS Code Chat extensions: https://code.visualstudio.com/api/extension-guides/chat
- Claude Code Slash commands: https://code.claude.com/docs/en/slash-commands
