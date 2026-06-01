# Model-Adaptive Prompting Requirement Review

## Review Target

- Requirement: `REQ-WS-044`
- Change record: `_requirements/changes/2026-06-01-model-adaptive-prompting.en.md`
- Related config: `agent-platform/configs/usage/ai-usage-gap-profile.json`

## Result

Accepted.

## Rationale

The user instruction is a durable operating rule. However, encoding "two requests are always better" would ignore cost, latency, model differences, and missing verification. The requirement is therefore constrained to these conditions:

- The model is weak, non-reasoning, or uncertain.
- The task has high output variance, such as reasoning, design, classification, summarization, or critique.
- Cost and latency are acceptable.
- The agent can compare, merge, and verify results.

For strong reasoning models, official guidance indicates that model families can require different prompting approaches, so clear task framing and verification come before duplicate calls.

## Validation Criteria

- Add `REQ-WS-044` to the requirements baseline.
- Add `model_capability_profiles` and `model_adaptive_prompting_policy` to `ai-usage-gap-profile.json`.
- Connect the rule to the workflow, prompt, persistent instructions, and memory bootstrap.
- Confirm in final evaluation that repeated agreement is not treated as factual proof.
