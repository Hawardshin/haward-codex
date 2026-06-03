# 웹 검색 기록: Manager Tool Orchestration Planner

## 요청 요약

multi-agent를 관리하기 위해 중앙 manager가 subagent를 도구처럼 호출하는 agent orchestration tool 구조를 쉽게 만들라는 요청.

## 검색어

- `OpenAI Agents SDK handoffs tools multi-agent orchestration official docs`
- `LangGraph multi-agent supervisor handoffs official docs`
- `CrewAI multi-agent orchestration tools official docs`
- `site:github.com/openai/openai-agents-python agent_patterns agents as tools`
- `site:github.com/langchain-ai/langgraph multi_agent supervisor example`

## 확인한 출처

- OpenAI Agents SDK Agent orchestration: https://openai.github.io/openai-agents-python/multi_agent/
- OpenAI Agents SDK JS Agents composition patterns: https://openai.github.io/openai-agents-js/guides/agents/
- LangChain multi-agent docs: https://docs.langchain.com/oss/python/langchain/multi-agent
- CrewAI introduction: https://docs.crewai.com/en/introduction
- OpenAI open-source agents-as-tools example: https://github.com/openai/openai-agents-python/blob/main/examples/agent_patterns/agents_as_tools.py
- LangGraph supervisor repository: https://github.com/langchain-ai/langgraph-supervisor-py

## 계획 반영 인사이트

- OpenAI 공식 문서는 manager가 specialist agent를 tool로 호출하는 `agents as tools`와 handoff를 구분한다. 이번 요청은 manager가 최종 merge/evaluation을 소유해야 하므로 manager-as-tools가 맞다.
- LangChain 공식 문서는 subagents, router, handoffs, skills, custom workflow를 구분한다. 이번 구현은 subagents와 router를 합친 `supervisor_router` 계획 도구로 두는 것이 기존 registry와 맞다.
- CrewAI는 Flow가 state/control을 관리하고 Crew가 agent team 작업을 수행한다고 설명한다. 따라서 runtime 실행보다 먼저 state/control/tool roster를 JSON plan으로 명시하는 것이 적합하다.
- OpenAI agents-as-tools 예제는 specialist agent를 tool name/description으로 노출한다. 로컬 planner도 `run_<agent_name>` tool record를 산출하도록 했다.

## 무시한 약한 출처

- Reddit 글과 미검증 블로그/논문 PDF는 adoption 또는 토론 신호로만 보고 구현 근거로 사용하지 않았다.
- 특정 벤더 framework 설치 권유는 이번 범위에서 제외했다. 실제 설치는 별도 설치 감사와 adapter 설계가 필요하다.

## 불확실성

- 이 변경은 실제 LLM runtime execution이 아니다. 실제 subagent 실행, streaming, trace store, 병렬 worker는 다음 별도 요구사항이다.

## 공개 판단 요약

이번 구현은 외부 framework를 설치하지 않고, 기존 `agent-platform`의 registry와 agent spec을 사용해 manager/subagent tool plan을 만드는 작은 deterministic CLI를 추가하는 것이 가장 작은 안전한 자산이다.
