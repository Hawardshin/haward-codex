# Spec: Subagent Live Execution

날짜: 2026-06-06

## 목적

Desktop Runtime에서 저장된 subagent tool plan의 첫 번째 tool을 검증한 뒤, 기존 CLI adapter session으로 시작한다. 이 slice는 planner 다음 단계인 live execution 진입점을 추가하되, multi-worker orchestration은 아직 실행하지 않는다.

## 동작

1. Renderer는 최근 `SubagentToolPlanReport`의 `taskRunId`와 첫 번째 `subagentTools[0].toolName`을 사용한다.
2. Renderer는 Tauri command `start_subagent_tool_execution`을 호출한다.
3. Rust command는 `plan_task_run_id`, `tool_name`, `adapter_id`, `prompt`를 검증한다.
4. Rust command는 task-run detail에서 `task_kind=subagent_tool_plan` record를 읽고, plan JSON 내부에 같은 `tool_name`이 있는지 확인한다.
5. Rust command는 subagent tool metadata와 사용자 prompt를 manager-owned execution prompt로 감싼다.
6. Rust command는 기존 `create_cli_session`을 호출해 `task_kind=subagent_tool_execution`, `pipeline_id`, `lane_id`, `lane_role`을 부여한다.
7. Renderer는 반환된 `CliSessionReport`를 세션 목록, 선택 세션, task-run 선택, 하단 터미널 drawer에 반영한다.
8. Desktop Runtime은 `선택 툴 실행` 버튼과 최근 실행 결과 요약을 표시한다.

## 안전 경계

- plan에 없는 tool은 실행하지 않는다.
- manager가 routing, merge, validation, final answer를 계속 소유한다.
- subagent prompt는 `_private`/`outputs` 접근 금지와 destructive/install/global environment change 금지를 포함한다.
- 실행은 cancellable CLI adapter session으로 들어가며 기존 cancel/prune/support bundle 경계를 재사용한다.
- Browser preview는 Tauri command를 실행하지 못하므로 정적 UI와 계약만 smoke한다.

## 참고

- OpenAI Agents SDK handoffs: https://openai.github.io/openai-agents-js/guides/handoffs/
- Claude Code subagents: https://docs.claude.com/ko/docs/claude-code/sub-agents
- VS Code Copilot subagents: https://code.visualstudio.com/docs/copilot/agents/subagents
- tauri-plugin-shell process events: https://docs.rs/tauri-plugin-shell/latest/tauri_plugin_shell/process/index.html
