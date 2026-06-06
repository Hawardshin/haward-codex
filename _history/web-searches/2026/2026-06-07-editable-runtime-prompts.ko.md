# Web Search: Editable Runtime Prompts

날짜: 2026-06-07

## 검색

- `VS Code official docs prompt files custom instructions editable prompts`
- `OpenAI Agents SDK official docs prompts instructions tools editable agent prompts`
- `Claude Code official docs custom slash commands prompts editable files`
- `Tauri v2 official docs frontend state local storage invoke settings`

## 확인한 출처

- VS Code Custom instructions: https://code.visualstudio.com/docs/copilot/copilot-customization
  - 사용자/워크스페이스 단위 instruction과 prompt customization이 파일/설정 기반으로 유지될 수 있음을 확인했다.
  - 영향: prompt는 일회성 textarea 값이 아니라 재사용 가능한 customization으로 취급했다.
- VS Code Prompt files: https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental
  - prompt file이 작업별 reusable prompt로 쓰이는 패턴을 확인했다.
  - 영향: 각 선택지를 독립 prompt key로 저장하도록 했다.
- OpenAI Agents SDK Agents: https://openai.github.io/openai-agents-js/guides/agents/
  - agent는 instructions와 tools를 함께 구성하는 building block임을 확인했다.
  - 영향: 세션 prompt는 adapter 실행 전 agent instruction seed로 보고 key별 저장을 적용했다.
- OpenAI Agents SDK Tools: https://openai.github.io/openai-agents-js/guides/tools/
  - tools는 agent가 task를 처리하기 위해 호출 가능한 capability로 구성된다.
  - 영향: 작업 파이프라인 prompt는 tool/agent 실행 경로를 초기화하는 reusable instruction으로 취급했다.
- Claude Code Slash commands: https://code.claude.com/docs/en/slash-commands
  - custom slash command가 Markdown 파일로 정의되는 prompt 재사용 패턴을 확인했다.
  - 영향: 선택 프롬프트 저장/기본값 복원 UX를 명시했다.
- Tauri Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
  - frontend와 Rust command boundary가 argument/result를 직렬화해 주고받는다는 기준을 확인했다.
  - 영향: preferences payload는 Rust에서도 정규화하도록 했다.

## 약한 출처

- 비공식 블로그와 요약 글은 채택하지 않았다.

## 계획 영향

- prompt override는 기존 runtime preferences 안에 저장한다.
- key whitelist와 길이 제한은 프런트엔드와 Rust 양쪽에 둔다.
- 외부 prompt editor dependency는 설치하지 않는다.

## 불확실성

- 공식 문서는 prompt 재사용 패턴의 참고 기준이다. 이 제품의 최종 저장/초기화 UX는 로컬 코드와 Browser smoke로 검증한다.
