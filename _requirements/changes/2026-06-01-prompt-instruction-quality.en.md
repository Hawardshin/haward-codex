# Requirement Change: Prompt And Instruction Quality Gate

## Change

- Add `REQ-WS-043`

## Background

The user stated that effective AI use depends on asking and instructing well, and that biased or poor instructions can distort results. The user also framed LLMs as probabilistic systems where better questions produce better answers, so the platform should preserve that rule.

## Requirement

Instructions that are vague, biased, leading, conclusion-seeking, missing an output contract, or treating an LLM as a deterministic truth machine must be rewritten before execution into neutral, checkable task briefs. The rewritten brief must include goal, context, constraints, output format, success criteria, counterevidence, and verification path.

## Impact

- Strengthens question and instruction quality rules in `agent-platform/configs/usage/ai-usage-gap-profile.json`.
- Uses `_ops/workflows/59-bridge-ai-usage-gap.md` and `_ops/prompts/89-bridge-ai-usage-gap.md` as the instruction rewrite gate.
- Makes the rule discoverable from persistent instructions, operating model, prompt router, and memory bootstrap.
