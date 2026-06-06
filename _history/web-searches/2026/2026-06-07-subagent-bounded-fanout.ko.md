# Web Search: Subagent Bounded Fan-Out

날짜: 2026-06-07

## Queries

- `OpenAI Agents SDK handoffs agents as tools official documentation`
- `Claude Code subagents parallel background permissions official documentation`
- `VS Code Copilot subagents orchestration runSubagent tools official documentation`
- `Tauri v2 shell plugin process CommandEvent stdout stderr termination official docs`

## 확인한 출처

- OpenAI Agents SDK handoffs: https://openai.github.io/openai-agents-js/guides/handoffs/
- Claude Code custom subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code agents and parallel work: https://code.claude.com/docs/en/agents
- VS Code subagents: https://code.visualstudio.com/docs/copilot/agents/subagents
- Tauri shell plugin: https://v2.tauri.app/plugin/shell/
- tauri-plugin-shell process module: https://docs.rs/tauri-plugin-shell/latest/tauri_plugin_shell/process/index.html

## 계획 영향

- OpenAI handoffs 문서는 handoff가 tool로 표현되는 구조를 확인시켜, plan의 tool name을 검증한 뒤 실행하는 구조를 유지했다.
- Claude Code subagents 문서는 subagent가 독립 context, tool access, permission boundary를 가질 수 있음을 보여, lane prompt에 manager-owned boundary와 금지 작업을 명시했다.
- Claude Code agents 문서는 병렬 작업에 worktree/session isolation이 필요함을 강조하므로, 첫 slice는 첫 2개 tool과 hard cap 3으로 제한했다.
- VS Code subagents 문서는 main agent가 subagent 결과를 받아 synthesis한다는 모델을 제시하므로, 자동 merge 대신 manual merge gate를 명시했다.
- Tauri/Rust process 출처는 새 shell string runner를 만들지 않고 기존 `Command` 기반 session lifecycle을 재사용하는 결정을 지지했다.

## 약한 출처 제외

- Reddit/커뮤니티 글은 discovery signal로만 보고 구현 근거로 사용하지 않았다.

## 공개 판단 요약

이번 구현은 최신 subagent 제품 패턴을 반영하되, 첫 multi-process step이므로 bounded process cap, registered adapter, workspace resolver, manual merge gate를 close-out 조건으로 삼는다.
