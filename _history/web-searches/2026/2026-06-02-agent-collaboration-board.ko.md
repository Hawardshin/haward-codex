# 웹 검색 기록: 에이전트 협업 작업판

## 검색일

- 2026-06-02

## 질문

Workspace Monitor에서 에이전트들이 서로 작업하고 있는 상태를 UI로 보여주려면 어떤 구조를 참고해야 하는가?

## 검색어

- `OpenAI Agents SDK tracing multi agent workflow visualization official docs`
- `LangGraph multi-agent workflows visualization official docs`
- `Temporal Web UI workflow visibility official docs`
- `Microsoft AutoGen multi-agent conversation framework official documentation`

## 확인한 출처

- OpenAI Agents SDK Tracing: https://openai.github.io/openai-agents-python/tracing/
- OpenAI Agent Builder: https://platform.openai.com/docs/guides/agent-builder
- LangGraph multi-agent workflows: https://www.langchain.com/blog/langgraph-multi-agent-workflows
- Microsoft AutoGen AgentChat: https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat/
- Temporal Web UI/Visibility 자료: https://docs.temporal.io/
- AutoGen paper: https://arxiv.org/abs/2308.08155

## 판단

- 실행 중인 에이전트 협업은 단순 목록보다 agent, task, handoff, blocker, project를 연결해서 보여주는 편이 좋다.
- 현재 Workspace Monitor는 정적 snapshot 기반이므로 실시간 tracing 대신 coordination status에서 lane과 flow를 생성하는 방식이 맞다.
- 향후 실시간이 필요해지면 trace/event store를 별도로 설계해야 한다.

## 계획 영향

- `collaborationBoard` snapshot을 추가한다.
- Agents 탭에 lane board와 agent-task-project flow를 추가한다.
- 새 dependency 없이 CSS 기반 시각화를 유지한다.
