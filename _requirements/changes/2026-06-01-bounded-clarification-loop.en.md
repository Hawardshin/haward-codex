# Bounded Clarification Loop Requirement Change

## Change Summary

- Date: 2026-06-01
- Source request: `UR-2026-06-01-035`
- Added requirement: `REQ-WS-046`
- Work mode: `governance`

## User Request Summary

The user said vague instructions are a key feature of poor instructions, and AI should ask the human clarifying counter-questions in those cases. However, endless clarification loops are also harmful, so the platform needs a process for improving questions and making them more specific.

## Change

Add `REQ-WS-046` to baseline vague-instruction handling:

- Do not blindly guess when a vague instruction has material missing information; ask clarifying counter-questions when needed.
- Limit questions to the missing goal, context, constraints, output contract, or success criteria that would materially change the result.
- Usually use one clarification round, and at most two.
- Ask no more than three prioritized questions per round.
- If the instruction remains vague, converge through reasonable assumptions, option-based defaults, ship-first-then-confirm, or explicit deferral.

## Evidence

- Microsoft Copilot Studio disambiguation guidance recommends narrowing user intent with clarification questions while providing fallback/handoff paths when options do not fit.
- TaskLint research shows that ambiguity in task instructions can affect task accuracy and that ambiguity detection can improve instruction quality.
- CLAM research proposes selective clarification for ambiguous questions followed by a final answer after clarification.
- Existing platform requirement `REQ-WS-043` already rewrites vague instructions into task briefs, but it did not make the clarification budget and termination conditions explicit enough.

## Impact

- `ai-usage-gap-profile.json` will include clarification budget, question prioritization, and convergence strategy.
- `_ops/workflows/59-bridge-ai-usage-gap.md` and `_ops/prompts/89-bridge-ai-usage-gap.md` will use budgeted clarification and fallback.
- Persistent instructions and AGENTS will reflect both asking clarifying questions and avoiding endless clarification loops.
