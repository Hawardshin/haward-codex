# Web Search: Chatbot Connection

날짜: 2026-06-07

## 검색

- `OpenAI Agents SDK official docs agents tools handoffs chat UI instructions`
- `Tauri v2 official docs calling Rust from frontend command state`
- `VS Code official docs chat extensions chat participant API`
- `Claude Code official docs slash commands custom prompts`

## 확인한 출처

- OpenAI Agents SDK Agents: https://openai.github.io/openai-agents-js/guides/agents/
  - agent는 instructions, tools, handoff 가능한 실행 단위로 구성된다.
  - 영향: 채팅 연결 상태는 단순 대화가 아니라 agent 실행 준비 상태로 모델링했다.
- OpenAI Agents SDK Tools: https://openai.github.io/openai-agents-js/guides/tools/
  - tool은 agent가 작업을 수행하기 위해 호출할 수 있는 capability다.
  - 영향: terminal fallback과 task-run store를 agent 실행 capability 연결로 표시했다.
- Tauri Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
  - frontend가 Rust command를 호출하는 invoke boundary를 확인했다.
  - 영향: 이미 존재하는 Rust command를 재사용하고 새 command를 추가하지 않았다.
- VS Code Chat extensions: https://code.visualstudio.com/api/extension-guides/chat
  - chat participant는 도구와 command를 통해 IDE 안의 작업 흐름과 연결될 수 있다.
  - 영향: 명령 팔레트 `챗봇 연결` 항목을 채팅 화면의 실행 진입점으로 추가했다.
- Claude Code Slash commands: https://code.claude.com/docs/en/slash-commands
  - command가 reusable prompt/workflow 진입점으로 작동하는 패턴을 확인했다.
  - 영향: 사용자 표현인 `챗봇 연결`을 command keyword로 직접 등록했다.

## 약한 출처

- 비공식 블로그와 제품 홍보 글은 채택하지 않았다.

## 계획 영향

- 새 provider integration을 만들지 않고 기존 provider API, terminal fallback, task-run store를 UI에서 연결한다.
- 새 dependency 설치 없이 기존 Tauri invoke와 React state를 사용한다.
- 연결 상태와 command entry는 테스트로 고정한다.

## 불확실성

- 공식 문서는 실행 패턴의 참고 기준이다. 실제 연결 여부는 로컬 코드의 provider credential 상태와 Browser smoke로 확인한다.
