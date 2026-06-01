# Work Evaluation: Model-Adaptive Prompting

## Result

- Status: `ready_to_close`
- Work mode: `governance`
- Requirement: `REQ-WS-044`
- Evaluation input: `_history/evaluations/2026/2026-06-01-model-adaptive-prompting-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-01-model-adaptive-prompting-grounding.json`

## Alignment With Initial Instruction

The user asked to reflect the rule that strong and weak models require different usage strategies, and that weak non-reasoning models can benefit from two sequential attempts.

Result:

- Baselined model-adaptive prompting as `REQ-WS-044`.
- Added `model_capability_profiles` and `model_adaptive_prompting_policy` to `ai-usage-gap-profile.json`.
- Scoped weak/non-reasoning/uncertain-model two-pass strategy to high-variance tasks where cost and latency allow and comparison/merge is possible.
- Required strong reasoning models to prioritize clear goal, context, constraints, success criteria, and verification before duplicate calls.
- Preserved the boundary that repeated agreement is an agreement signal, not factual proof.

## References Checked

- Self-consistency, Self-Refine, and Reflexion papers
- OpenAI reasoning best practices
- Microsoft Foundry prompt engineering guidance
- Existing `ai-usage-gap-profile.json` and prompt instruction quality gate docs

## Verification

- JSON syntax: passed
- Config contract: passed
- Memory bootstrap: passed
- Docs audit: passed
- Naming audit: passed
- Structure audit: passed
- Workspace index/task board freshness: passed
- Workspace health governance: passed
- Grounding check: `ready_to_publish`
- Work evaluator: `ready_to_close`
- Work timer: `ready`
- `git diff --check`: passed

## Remaining Improvements

- Split model-specific cost/latency thresholds and evaluator routing into a dedicated config.
- Add a small helper or evaluator prompt that compares two-pass outputs automatically.
