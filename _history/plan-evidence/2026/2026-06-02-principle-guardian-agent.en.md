# Plan Evidence: Principle Guardian Agent

## Request Interpretation

The user said that everyone strongly adheres to principles. This was interpreted as a durable instruction to add a common guard so agents do not bypass operating principles for speed, money, optimism, or convenience.

## Decision

- agent name: `principle-guardian-agent`
- boundary: shared `agent-platform` governance agent
- work mode: `governance`
- output: principle adherence brief

## Evidence-Based Design

- NIST AI RMF -> governance, risk management, measurement
- ISO/IEC 42001 -> AI management systems, policies, objectives, processes, continual improvement
- OECD AI Principles -> transparency, robustness, safety, accountability
- HRO principles -> failure sensitivity, reluctance to simplify, sensitivity to operations

## Alternatives

- `principle-enforcer-agent`: strong but too command-like and weaker on human decision routing.
- `ethics-agent`: too narrow for repository operations, specs, evidence, and validation.
- `principle-guardian-agent`: selected because it covers principle protection, conflict exposure, and human checkpoints.

## Expected Verification

- The agent spec should pass `inspect-agent`.
- The agent should appear in `list-agents`.
- The orchestration registry check should remain green.
- Durable instructions and history should be linked.
