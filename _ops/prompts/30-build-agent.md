# Build Agent Prompt

Use when: 에이전트, 에이전트 런타임, 플랫폼 기능, 평가 기능을 만들 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Use Python as the default runtime and follow the current agent-platform/ structure.
Before building from scratch, check mature open-source candidates and strong references.
If an open-source dependency or tool is the right fit, install it in the owning project/tool scope instead of avoiding installation by default.
Before installing, record installation scope, exact install command, dependency record path, security review, license review, verification method, and rollback plan.
Keep external frameworks behind agent_platform.adapters.
Prefer local platform models such as AgentSpec, ExecutionRequest, and ExecutionResult.
Update tests and documentation with the implementation.
```

## References

- [agent-platform/docs/python-agent-structure.md](../../agent-platform/docs/python-agent-structure.md)
- [agent-platform/docs/open-source-integration.md](../../agent-platform/docs/open-source-integration.md)
