# 웹 검색 기록: Agent Creation And Orchestration Platform

## 요청

- `UR-2026-06-02-015`: 플랫폼으로서 다양한 에이전트를 만들고, 다양한 에이전트를 쉽게 만들고, 오케스트레이션할 수 있는 구조를 만든다.

## 검색어

- `LangGraph official documentation multi-agent orchestration agents`
- `Microsoft AutoGen official documentation multi-agent orchestration`
- `CrewAI official documentation multi agent orchestration agents`
- `OpenAI Agents SDK official documentation orchestration agents`
- `LangGraph multi-agent systems supervisor handoffs official docs`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 판단 |
| --- | --- | --- | --- |
| https://docs.langchain.com/oss/python/langchain/multi-agent | official | LangChain multi-agent 문서는 subagents, handoffs, skills, router, custom workflow 같은 pattern과 parallelization/context trade-off를 설명한다. | framework-neutral pattern 후보에 반영 |
| https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html | official | AutoGen AgentChat은 agents, teams, human-in-the-loop, state, tracing/observability, multi-agent design patterns를 분리한다. | agent spec과 orchestration controls 필요성에 반영 |
| https://docs.crewai.com/concepts/crews | official | CrewAI Crews는 agents, tasks, process, memory, cache, callbacks, planning, YAML configuration을 다룬다. | blueprint, agent/task separation, observability/resource controls에 반영 |
| https://docs.crewai.com/concepts/flows | official | CrewAI Flows는 event/state 중심 workflow 참고 자료다. | stateful orchestration pattern 참고 |
| https://openai.github.io/openai-agents-python/ | official | OpenAI Agents SDK는 agents, tools, handoffs, tracing을 핵심 개념으로 제공한다. | tool/handoff/tracing 검증 항목에 반영 |

## 제외하거나 약하게 본 출처

- 블로그/Reddit/포럼 검색 결과는 discovery signal로만 보았다. 이번 변경은 플랫폼 계약을 세우는 단계라 공식 문서와 내부 저장소 구조를 우선했다.
- 특정 framework 설치 방법은 이번 범위에서 제외했다. 설치가 필요해지는 시점에는 별도 설치 감사와 license/security review가 필요하다.

## 계획 반영 인사이트

- 여러 framework가 공통적으로 agent, tool, task/workflow, state, handoff, observability/evaluation 경계를 분리한다.
- 따라서 이 저장소는 먼저 framework-neutral registry를 만들고, 나중에 LangGraph/AutoGen/CrewAI/OpenAI Agents SDK 같은 구현 후보를 adapter로 붙이는 쪽이 유지보수에 유리하다.
- 새 agent를 prompt-only로 만들면 장기 관리가 어려우므로 spec, blueprint, input/output, tool policy, validation command를 필수화한다.

## 불확실성

- 각 framework 문서는 빠르게 바뀔 수 있다. registry는 구체 API가 아니라 운영 계약을 담고 있으므로, framework 도입 시점에 최신 공식 문서를 다시 확인해야 한다.

## 공개 판단 요약

이번 작업은 agent runtime을 설치하거나 실제 scheduler를 만드는 작업이 아니라, 다양한 agent를 만들고 연결하는 데 필요한 최소 공통 계약과 검증 게이트를 추가하는 것이 적절하다.
