# 웹 검색 기록: Subagent Tool Use

날짜: 2026-06-06

## 질의

- `OpenAI Agents SDK handoffs tools agents subagents official documentation`
- `Anthropic Claude Code subagents tools official documentation`
- `VS Code Copilot coding agent subagents tools official documentation`

## 확인한 출처

- OpenAI Agents SDK Handoffs: https://openai.github.io/openai-agents-python/handoffs/
- OpenAI Agents SDK Agents: https://openai.github.io/openai-agents-python/agents/
- Claude Code Subagents: https://docs.claude.com/ko/docs/claude-code/sub-agents
- VS Code Copilot Subagents: https://code.visualstudio.com/docs/copilot/agents/subagents

## 반영

- subagent를 독립 실행 주체가 아니라 manager가 호출하는 bounded tool로 모델링했다.
- manager가 route, tool call, merge, evaluation, final answer를 소유한다는 제약을 유지했다.
- subagent마다 tool access가 명시되어야 하므로 Tool Studio playbook과 `plan-agent-orchestration` validation ladder에 allowed/blocked tool 정책을 넣었다.
- 이번 slice에서는 live autonomous subagent execution 대신 plan 생성과 task-run persistence를 먼저 구현했다.

## 불확실성

- 각 vendor의 subagent runtime API는 서로 다르다. 플랫폼은 특정 vendor 구현에 묶지 않고 framework-neutral planner command를 실행한다.
