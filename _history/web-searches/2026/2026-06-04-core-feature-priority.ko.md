# 웹 검색 기록: 핵심 기능 우선순위

## 검색

- `OpenAI Agents SDK agents tools handoffs sessions tracing official docs`
- `Claude Code custom subagents official docs`
- `Claude Code CLI hooks MCP custom slash commands official docs`
- `LangGraph multi-agent supervisor handoffs official docs`
- resume check: `OpenAI Agents SDK agents sessions handoffs official docs`, `Claude Code custom subagents MCP hooks official docs`, `LangGraph multi-agent supervisor handoffs official docs`

## 확인한 출처

- OpenAI Agents SDK Agents  
  URL: `https://openai.github.io/openai-agents-python/agents/`  
  신뢰도: 공식 문서, 높음  
  반영: Agent Core는 agent + runner가 turns, tools, guardrails, handoffs, sessions를 관리하는 구조를 제품 primitive로 보게 했다.
- OpenAI Agents SDK Sessions, Handoffs, Tracing  
  URL: `https://openai.github.io/openai-agents-python/sessions/`  
  URL: `https://openai.github.io/openai-agents-python/handoffs/`  
  URL: `https://openai.github.io/openai-agents-python/tracing/`  
  신뢰도: 공식 문서, 높음  
  반영: 연속성, handoff, task-run/trace 관찰은 CLI orchestration과 work visibility의 근거로 사용했다.
- Claude Code custom subagents  
  URL: `https://code.claude.com/docs/en/sub-agents`  
  신뢰도: 공식 문서, 높음  
  반영: subagent는 별도 context, tool access, permission, explicit invocation을 가진 task-specific worker로 취급했다.
- Claude Code MCP and hooks  
  URL: `https://code.claude.com/docs/en/mcp`  
  URL: `https://code.claude.com/docs/en/hooks`  
  신뢰도: 공식 문서, 높음  
  반영: root tool setup, connector trust, hook/elicitation-style decision routing을 core setup에 노출해야 한다고 판단했다.
- LangGraph multi-agent docs  
  URL: `https://langchain-ai.github.io/langgraph/concepts/multi_agent/`  
  URL: `https://langchain-ai.github.io/langgraph/tutorials/multi_agent/multi-agent-collaboration/`  
  신뢰도: 공식 문서, 중간  
  반영: manager/subagent, supervisor/handoff 패턴은 task-specific multi-agent sharing을 허용하되 root tools는 별도 layer로 유지하는 방향에 사용했다.

## 반영

- 두 primary 기능을 Agent Core와 CLI Orchestration으로 제한했다.
- Root Tool Management와 Work Visibility를 supporting feature로 추가했다.
- setup requirement를 Home과 settings에 드러냈다.
- generated snapshots와 readiness gates를 새 제품 계약으로 갱신했다.

## 불확실성

- 외부 framework 문서는 각 제품의 구현 모델이므로 이 플랫폼에는 framework-neutral 제품 원칙으로만 전이했다.
- 실제 Claude Code/Codex/Gemini/OpenCode adapter별 세부 CLI protocol은 기존 adapter registry의 별도 범위로 남겼다.

## 재개 후 확인

- 중단 후 재개 시 같은 official source lane을 다시 확인했고, 계획 변경은 없었다.
