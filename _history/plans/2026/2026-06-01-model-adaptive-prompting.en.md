# Plan Record: Model-Adaptive Prompting

## Work Mode

`governance`

## Plan

1. Use web search to verify multi-sample, iterative refinement, and reasoning-model prompting sources.
2. Summarize the user request as `UR-2026-06-01-033` and baseline it as `REQ-WS-044`.
3. Add model capability profiles and two-pass policy to `ai-usage-gap-profile.json`.
4. Update the operating model, workflow, prompt, persistent instructions, and memory bootstrap to point to the same rule.
5. Save research note, web search record, spec artifacts, request trace, work summary, timing, and evaluation.
6. Run config, docs, governance, evaluator, and grounding checks, then commit and push.

## Plan Evidence

- Self-consistency supports multi-sample reasoning-path selection.
- Self-Refine and Reflexion support draft-feedback-retry loops.
- OpenAI and Microsoft official docs support model-family-specific prompting differences.

## Decision

Do not encode two-pass prompting as a universal rule. Encode it as a default candidate for weak, non-reasoning, or uncertain models on high-variance tasks. Repeated agreement remains an agreement signal, not proof.
