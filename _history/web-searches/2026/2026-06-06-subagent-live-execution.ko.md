# Web Search: Subagent Live Execution

날짜: 2026-06-06

## Queries

- `Tauri v2 command sidecar process official documentation Command create process stdout stderr timeout`
- `OpenAI Agents SDK tools handoffs agents official documentation`
- `Claude Code subagents tools official documentation`
- `VS Code Copilot subagents prompt tools official documentation`
- `Tauri v2 shell plugin Command spawn stdout stderr official docs`
- `Tauri plugin shell CommandEvent stdout stderr docs.rs tauri-plugin-shell`

## 확인한 출처

- OpenAI Agents SDK handoffs: https://openai.github.io/openai-agents-js/guides/handoffs/
- Claude Code subagents: https://docs.claude.com/ko/docs/claude-code/sub-agents
- VS Code Copilot subagents: https://code.visualstudio.com/docs/copilot/agents/subagents
- tauri-plugin-shell process module: https://docs.rs/tauri-plugin-shell/latest/tauri_plugin_shell/process/index.html
- tauri-plugin-shell command source: https://docs.rs/crate/tauri-plugin-shell/latest/source/src/commands.rs

## 계획 영향

- OpenAI handoff 문서는 handoff가 tool 형태로 표현될 수 있음을 확인시켜, `toolName` 검증 후 실행하는 구조를 지지했다.
- Claude Code와 VS Code 문서는 subagent가 독립 context와 제한된 tool set을 가질 수 있음을 확인시켜, manager-owned boundary와 single advisory session prompt를 유지했다.
- Tauri shell/process 문서는 stdout/stderr/termination event가 process lifecycle에서 명시적으로 다뤄져야 함을 확인시켜, 새 runner를 만들지 않고 기존 CLI session lifecycle과 task-run persistence를 재사용하는 결정을 지지했다.

## 약한 출처 제외

- 블로그/비공식 튜토리얼은 구현 결정의 근거로 사용하지 않았다.

## 불확실성

- Browser preview에서는 Tauri native command를 실행할 수 없으므로 실제 desktop runtime smoke는 별도 packaged app 검증에서만 완전히 닫힌다.
