# Work Evaluation: Bounded Clarification Loop

## Evaluation Result

- Status: `ready_to_close`
- Work mode: `governance`
- Requirement: `REQ-WS-046`
- Evaluation input: `_history/evaluations/2026/2026-06-01-bounded-clarification-loop-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-01-bounded-clarification-loop-grounding.json`

## Result Versus Initial Instruction

The user said vague instructions are a feature of poor instructions, and AI should ask clarifying counter-questions when needed, but endless question loops are harmful.

Implemented result:

- Baselined the bounded clarification rule as `REQ-WS-046`.
- Added `bounded_clarification_policy` to `ai-usage-gap-profile.json`.
- Limited clarification to usually one round and at most two, with no more than three questions per round.
- Defined convergence through reasonable assumptions, recommended defaults, ship-first-then-confirm, or explicit deferral when answers are missing or remain vague.
- Connected the same rule to the operating model, workflow, prompt, router, index, persistent instructions, AGENTS, and memory bootstrap.

## References Checked

- Microsoft Copilot Studio disambiguation guidance
- OpenAI prompt engineering best practices
- Microsoft Azure/OpenAI prompt engineering guidance
- TaskLint instruction ambiguity research
- CLAM selective clarification research

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

## Remaining Improvement Candidates

- Add prompt examples for one-round clarification, assumption-based progress, and explicit deferral.
- If this pattern repeats, create a small linter for prompt ambiguity categories and question-budget compliance.
