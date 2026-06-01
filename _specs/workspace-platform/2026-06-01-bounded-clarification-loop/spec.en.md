# Spec: Bounded Clarification Loop

## Requirement

- `REQ-WS-046`

## Problem

Vague instructions can strongly reduce AI output quality. However, turning every ambiguity into a long list of questions slows work down and conflicts with the platform's automation purpose. Agents should ask clarifying counter-questions when needed, but only for decision-critical uncertainty, and then converge into an actionable task brief.

## Goals

- Classify vague instructions as `vague_intent`, `no_output_contract`, or `clarification_loop_risk`.
- Usually limit clarification to one round and at most two rounds.
- Limit each round to at most three questions, ordered by decision impact.
- If ambiguity remains, converge through reasonable assumptions, recommended defaults, ship-first-then-confirm, or explicit deferral.
- Reflect the rule in the existing instruction quality gate, workflow, prompt, persistent instructions, and memory bootstrap.

## Non-Goals

- Do not return every vague request to the user.
- Do not make questionnaires or discovery interviews the default.
- Do not guess through high-risk or irreversible decisions.

## Design

- Add `bounded_clarification_policy` to `ai-usage-gap-profile.json`.
- Add `clarification_loop_risk` and `bounded_clarification` intervention to the workflow and prompt.
- Add clarification budget and convergence rules to persistent instructions and AGENTS.
- Keep the policy discoverable through memory bootstrap warm anchors.
- Link requirements, specs, history, and evaluation records.

## Acceptance Criteria

- `REQ-WS-046` exists in the requirements baseline.
- `ai-usage-gap-profile.json` passes config contract.
- Workflow and prompt state question budget, maximum question count, and convergence strategy.
- Persistent instructions and AGENTS preserve the durable rule for future sessions.
- Grounding and evaluator checks pass.
