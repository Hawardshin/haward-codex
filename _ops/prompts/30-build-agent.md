# Build Agent Prompt

Use when: 에이전트, 에이전트 런타임, 플랫폼 기능, 평가 기능을 만들 때.

## Prompt

```text
Python을 기본 런타임으로 두고 agent-platform/의 현재 구조를 우선 따른다.
직접 구현 전에 성숙한 오픈소스 후보가 있는지 확인한다.
외부 프레임워크는 agent_platform.adapters 뒤에 둔다.
플랫폼 내부 모델은 AgentSpec, ExecutionRequest, ExecutionResult 같은 로컬 모델을 우선 사용한다.
테스트와 문서를 함께 업데이트한다.
```

## References

- [agent-platform/docs/python-agent-structure.md](../../agent-platform/docs/python-agent-structure.md)
- [agent-platform/docs/open-source-integration.md](../../agent-platform/docs/open-source-integration.md)
