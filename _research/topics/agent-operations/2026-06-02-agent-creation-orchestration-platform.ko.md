# 재사용 조사 노트: 에이전트 생성과 오케스트레이션 구조

## 핵심 요약

여러 최신 agent framework는 표현 방식은 다르지만, 복잡한 agent 시스템을 만들 때 다음 요소를 분리한다.

- agent 또는 worker 단위
- tool 또는 task 단위
- supervisor/router/handoff 같은 coordination 방식
- state와 memory
- human-in-the-loop 또는 checkpoint
- logging, tracing, observability
- validation 또는 evaluation

## 플랫폼 적용

이 저장소에서는 특정 framework를 먼저 설치하지 않고, 위 요소를 `agent-orchestration-registry.json`의 공통 계약으로 둔다. 이렇게 하면 Codex, Claude Code, Cursor, Antigravity, 외부 CLI, future desktop app에서도 같은 원칙을 사용할 수 있다.

## 참고 출처

- LangChain multi-agent docs: https://docs.langchain.com/oss/python/langchain/multi-agent
- Microsoft AutoGen AgentChat: https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html
- CrewAI Crews: https://docs.crewai.com/concepts/crews
- CrewAI Flows: https://docs.crewai.com/concepts/flows
- OpenAI Agents SDK: https://openai.github.io/openai-agents-python/

## 한계

- 이 노트는 2026-06-02 접근 기준이다.
- framework API와 권장 패턴은 자주 바뀔 수 있으므로 실제 도입 전에는 최신 공식 문서를 다시 확인한다.
