# Requirement Review: Prompt And Instruction Quality Gate

## Review Target

- `REQ-WS-043`

## Fit

- The user request is not one-off advice; it is a durable operating principle for future AI work.
- Existing `REQ-WS-042` covers the broader AI-use gap, but an explicit pre-execution rewrite rule for poor instructions is easier to maintain as a separate requirement.
- The requirement does not conflict with web-first, hallucination prevention, knowledge skeptic, or spec/source reconciliation rules. It improves checkability before execution.

## Decision

Adopt `REQ-WS-043` as a shared workspace requirement.

## Verification Criteria

- `ai-usage-gap-profile.json` contains bad instruction patterns, LLM assumptions, prompt quality checklist, and instruction rewrite contract.
- Workflow, prompt, router, persistent instructions, and memory bootstrap expose the question/instruction quality rule.
- Web search records, research notes, specs, and evaluation connect external evidence and internal change evidence.
