# Plan Evidence: Infrastructure Expert Agent

## Decision

- Implement as a reusable domain agent.
- Owner is `agent-platform/`.
- Do not execute infrastructure changes, install CLIs, or provision cloud resources.
- Include official-source requirements, risk register, rollback, human checkpoint, and resource/CLI policy links in the agent contract.

## Evidence

- The user request is short, but "infrastructure expert" is a role addition, so the existing agent creation/orchestration registry should apply.
- Infrastructure decisions carry cost, security, reliability, and operations risk, so source lanes are required instead of memory-only answers.
- SRE and cloud well-architected references fit the need to separate operational excellence, reliability, security, cost, and trade-offs.
- Terraform/Kubernetes work is stack-specific and should re-check official docs, so those source requirements belong in the agent contract.

## Alternatives

- New root project: deferred because no specific infrastructure product or provider was selected.
- CLI/tool installation: excluded because this request creates the expert agent, not the execution environment.
- Runtime scheduler: deferred because the agent spec is the immediate prerequisite.
