# Spec: Model-Adaptive Prompting

## Scope

Reflect `REQ-WS-044` by adding model-capability-specific prompting strategy to the AI usage gap operating model.

## Requirements

- Weak, non-reasoning, or uncertain models can use two-pass or draft-critique-revise loops on high-variance tasks.
- Strong reasoning models prioritize clear goal, context, constraints, success criteria, and verification over duplicate calls.
- Repeated agreement is treated only as an agreement signal, not factual proof.
- Config, operating docs, workflow, prompt, persistent instructions, and memory bootstrap point to the same rule.

## Out Of Scope

- Do not store vendor-specific model rankings.
- Do not force two-pass prompting for every task.
- Do not add new runtime or API-call code.

## Success Criteria

- `ai-usage-gap-profile.json` passes the self-documenting config contract.
- Model strategy and two-pass conditions are reflected in paired docs and the workflow.
- Web search records, requirement change/review, history, and evaluation files are linked.
