# Manager Tool Orchestration Planner Research Note

## 요약

manager-as-tools 구조는 중앙 manager가 사용자 대화와 최종 결과를 소유하고, specialist subagent를 bounded tool로 호출하는 방식이다. 이번 저장소 구현에는 실제 runtime framework보다 먼저 agent roster, tool access, state/handoff, validation command를 JSON으로 고정하는 deterministic planner가 적합하다.

## 출처와 적용

- OpenAI Agents SDK orchestration docs
  - URL: https://openai.github.io/openai-agents-python/multi_agent/
  - 신뢰도: official docs
  - 적용: agents-as-tools와 handoffs의 차이를 기준으로, manager가 최종 merge/evaluation을 소유하는 구조를 선택했다.
- LangChain multi-agent docs
  - URL: https://docs.langchain.com/oss/python/langchain/multi-agent
  - 신뢰도: official docs
  - 적용: subagents, router, handoffs, skills, custom workflow 패턴 분류를 기존 `supervisor_router` registry와 연결했다.
- CrewAI introduction
  - URL: https://docs.crewai.com/en/introduction
  - 신뢰도: official docs
  - 적용: Flow가 state/control을 담당하고 Crew가 agent team work를 수행한다는 분리를 참고해, 실행 전 state/control plan을 먼저 만들었다.
- OpenAI agents-as-tools example
  - URL: https://github.com/openai/openai-agents-python/blob/main/examples/agent_patterns/agents_as_tools.py
  - 신뢰도: open-source reference implementation
  - 적용: specialist agent를 tool name과 description으로 노출하는 방식을 로컬 `run_<agent_name>` tool plan으로 반영했다.

## 구현 결정

- 선택: Python deterministic planner
- 기각: 즉시 LangGraph/CrewAI/OpenAI Agents SDK 설치
- 이유: 설치 감사, provider 설정, runtime resource guard 없이 framework를 붙이면 이번 요청의 핵심인 “쉽게 만들 구조”보다 운영 위험과 범위가 커진다.

## 한계

- 실제 subagent 실행은 하지 않는다.
- auto-selection은 keyword matching이라 실제 사용 로그가 쌓인 뒤 scorer 개선이 필요할 수 있다.
- runtime adapter가 생기면 trace persistence, cleanup, retry, cancellation, human checkpoint UI를 별도로 설계해야 한다.
