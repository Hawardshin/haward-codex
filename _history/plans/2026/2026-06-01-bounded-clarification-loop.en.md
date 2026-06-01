# Plan Record: Bounded Clarification Loop

## Request

The user said vague instructions are a core feature of poor instructions, and AI should ask humans clarifying counter-questions when needed. However, endless questioning is harmful, so the clarification process needs limits.

## Work Mode

- `governance`

## Decisions

- Baseline the rule as `REQ-WS-046`.
- Strengthen existing `REQ-WS-043` task-brief rewriting with question budget and termination conditions.
- Ask only for uncertainty that would materially change the result.
- For low-risk and reversible gaps, proceed with assumptions and a verification path.

## Execution Plan

1. Add bounded clarification policy to `ai-usage-gap-profile.json`.
2. Update operating model, workflow, prompt, router, index, persistent instructions, AGENTS, and memory bootstrap.
3. Link requirements, specs, research note, history, and evaluation.
4. Validate, commit, and push.
