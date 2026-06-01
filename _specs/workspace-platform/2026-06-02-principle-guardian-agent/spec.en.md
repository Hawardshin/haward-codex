# Spec: Principle Guardian Agent

## Background

The user said that everyone strongly adheres to principles. This is interpreted as a durable instruction that all agents should preserve operating principles and not bypass them for speed, money, optimism, or convenience.

## Requirements

- Add `principle-guardian-agent` as a reusable governance agent in agent-platform.
- The agent must check principle adherence against durable instructions, operating philosophy, requirements, specs, work mode, and evaluation gates.
- When speed, money, optimism, convenience, or user pressure conflicts with principles, the agent must preserve the principle and propose a compliant alternative.
- Principle conflicts must record governing source, decision reason, human checkpoint, or reversible path.
- Persistent instructions and README must record the principle-adherence rule.

## Out Of Scope

- A separate runtime supervisor implementation is out of scope.
- This change does not rewrite every existing agent config.

## Acceptance Criteria

- `inspect-agent` passes.
- `list-agents` includes `principle-guardian-agent`.
- The orchestration check passes.
- Persistent instructions and the requirements baseline are updated.
