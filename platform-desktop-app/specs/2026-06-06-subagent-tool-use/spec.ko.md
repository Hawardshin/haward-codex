# Spec: Subagent Tool Use

날짜: 2026-06-06

## 목적

Desktop Runtime과 Tool Studio에서 agent/subagent tool 사용을 눈에 보이는 기능으로 만든다. 먼저 manager-as-tools plan을 생성하고 기록하는 bounded command를 제공한다.

## 동작

1. Tool Studio registry에 `subagent-delegation-loop`와 `subagent-delegation-ladder`를 추가한다.
2. Rust/Tauri command `run_subagent_tool_plan`을 추가한다.
3. command는 runtime task-run directory에 `input.json`을 작성한다.
4. command는 `python3 -c ... agent_platform.cli plan-agent-orchestration <input>`만 실행한다.
5. stdout plan JSON에서 `status`, `subagent_tools`를 추출해 renderer에 반환한다.
6. record/stdout/stderr/input path를 task-run store에 저장한다.
7. Desktop Runtime bridge는 `서브에이전트 툴 계획` 버튼과 최근 결과 요약을 표시한다.

## 안전 경계

- command cwd는 workspace 안의 `agent-platform/`로 제한한다.
- input/output은 app-data runtime store에 저장한다.
- Python 실행은 planner entrypoint에 고정하고 autonomous subagent execution은 하지 않는다.
- Browser preview에서는 Tauri command가 실행되지 않으므로 버튼은 runtime availability에 의해 비활성된다.

## 참고

- OpenAI Agents SDK handoffs: https://openai.github.io/openai-agents-python/handoffs/
- Claude Code subagents: https://docs.claude.com/ko/docs/claude-code/sub-agents
- VS Code Copilot subagents: https://code.visualstudio.com/docs/copilot/agents/subagents
