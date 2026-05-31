# Build Agent Prompt

Use when: 에이전트, 에이전트 런타임, 플랫폼 기능, 평가 기능을 만들 때.

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
