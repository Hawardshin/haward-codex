# Spec: Subagent Bounded Fan-Out

날짜: 2026-06-07

## 목적

저장된 subagent plan에서 첫 2개 tool을 검증해 독립 CLI session으로 시작하고, 같은 pipeline id와 manual merge gate로 묶는다. 이는 단일 lane 실행 다음의 첫 multi-process slice이며, 자동 fan-in/merge는 하지 않는다.

## 동작

1. Renderer는 최근 `SubagentToolPlanReport`가 `completed`이고 tool이 2개 이상일 때 `첫 2개 묶음 실행` 버튼을 활성화한다.
2. Renderer는 `start_subagent_tool_fanout`에 `planTaskRunId`, 첫 2개 `toolNames`, adapter id, prompt, working dir, `maxSessions=2`를 넘긴다.
3. Rust command는 plan record가 `subagent_tool_plan`인지 확인하고, 요청 tool name이 plan에 있는지 검증한다.
4. Rust command는 `maxSessions`가 1 이상 3 이하인지 확인한다.
5. Rust command는 각 tool에 대해 fan-out lane prompt를 생성하고 기존 `create_cli_session`으로 시작한다.
6. Rust command는 partial failure를 허용하되 각 lane status를 `running`, `capability_missing`, `init_failed` 등으로 명시한다.
7. Rust command는 `SubagentToolFanoutReport`를 반환하며, `lanes`, `pipes`, `mergeGate`, `startedSessions`, `missingLanes`, `skippedTools`, `processCap`을 포함한다.
8. Renderer는 report를 `pipelineReports`와 최근 fan-out 카드에 표시하고, 시작된 session들을 하단 terminal session list에 합친다.

## 안전 경계

- default fan-out은 첫 2개 tool만 실행한다.
- hard cap은 3 sessions다.
- adapter는 registered adapter만 허용한다.
- cwd는 기존 workspace resolver를 통과해야 한다.
- prompt는 `_private`/`outputs`, destructive file operation, install, global env change를 금지한다.
- manager가 fan-in, merge, validation, final answer를 소유한다.

## 참고

- OpenAI Agents SDK handoffs: https://openai.github.io/openai-agents-js/guides/handoffs/
- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code agents/parallel work: https://code.claude.com/docs/en/agents
- VS Code subagents: https://code.visualstudio.com/docs/copilot/agents/subagents
- Tauri shell plugin: https://v2.tauri.app/plugin/shell/
- Rust `std::process::Command`: https://doc.rust-lang.org/std/process/struct.Command.html
