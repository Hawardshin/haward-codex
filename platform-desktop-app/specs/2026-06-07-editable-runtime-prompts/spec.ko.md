# Spec: Editable Runtime Prompts

날짜: 2026-06-07

## 목적

Desktop Runtime에서 세션 프롬프트와 작업 파이프라인 프롬프트를 선택지별로 수정, 저장, 초기화할 수 있게 한다. 사용자는 반복 작업에 맞춘 프롬프트를 매번 다시 작성하지 않고 같은 런타임 기본 설정 안에서 재사용해야 한다.

## 동작

1. `RuntimeCustomization`은 `prompts.sessionPrompts`와 `prompts.taskPipePrompts`를 가진다.
2. 각 prompt override는 안정적인 prompt key로 저장한다.
3. 세션 프롬프트 key는 `sessionModePresets`의 mode id를 사용한다.
4. 작업 파이프라인 선택 프리셋 key는 `selected-preset:<taskKind>` 형식을 사용한다.
5. 작업 파이프라인 고정 선택지는 `implementation-pipe`, `research-pipe`, `review-pipe`를 사용한다.
6. 선택 버튼은 저장된 override가 있을 때 `customized` 상태와 "수정"/"Custom" badge를 보여준다.
7. textarea 아래에는 "선택 프롬프트 저장"과 "기본값" 액션을 제공한다.
8. 저장 시 공백을 trim하고 최대 4,000자까지 보존한다.
9. 저장값이 빈 값이거나 기본값과 같으면 override를 제거한다.
10. 초기화는 선택 key의 override만 제거하고 textarea를 기본값으로 되돌린다.

## 네이티브 저장 경계

- Rust `DesktopRuntimeCustomization`은 `DesktopPromptCustomization`을 포함한다.
- Rust 정규화는 허용 목록에 있는 session/task-pipe prompt key만 보존한다.
- 빈 prompt와 알 수 없는 key는 preferences 저장 전 제거된다.
- 저장 길이 제한은 프런트엔드와 Rust 모두 4,000자 기준을 공유한다.

## UX 경계

- 프롬프트 선택은 현재 선택 key를 바꾸고 textarea를 해당 key의 현재 값으로 갱신한다.
- textarea 편집은 저장 버튼을 누르기 전까지 preferences override를 변경하지 않는다.
- 저장 후 현재 선택 key가 초기 프리셋으로 되돌아가지 않아야 한다.
- main tab 전체 scroll owner를 새로 만들지 않고 기존 bounded textarea/control layout을 재사용한다.

## 참고

- VS Code Custom instructions: https://code.visualstudio.com/docs/copilot/copilot-customization
- VS Code Prompt files: https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental
- OpenAI Agents SDK Agents: https://openai.github.io/openai-agents-js/guides/agents/
- OpenAI Agents SDK Tools: https://openai.github.io/openai-agents-js/guides/tools/
- Claude Code Slash commands: https://code.claude.com/docs/en/slash-commands
- Tauri Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
