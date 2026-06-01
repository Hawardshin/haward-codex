# Non-Blocking Clarification Requirement Change

## Change Summary

- Date: 2026-06-02
- Source request: `UR-2026-06-02-001`
- Added requirement: `REQ-WS-047`
- Work mode: `governance`

## User Request Summary

The user pointed out that when a clarification question is unanswered, AI often stops every other task, creating a major AI-era bottleneck.

## Change

Add `REQ-WS-047` so waiting for a user answer does not become a default global pause.

- Isolate only the undecidable item as `blocked_decision`.
- Continue independent research, source collection, option comparison, drafting, testing, validation, documentation, and risk analysis as `unblocked_work`.
- Record assumptions and defaults used while waiting.
- Record the `resume_action` for merging or correcting affected files or decisions after the answer arrives.
- Defer irreversible or unsafe work instead of guessing.

## Evidence

- Elastic human-in-the-loop workflow docs describe human review at critical decision points.
- GitHub issue dependency docs make blocked-by and blocking relationships explicit so bottlenecks are visible.
- Zapier human-in-the-loop status docs show a pattern where the rest of a workflow can continue while a HITL step waits.
- Existing `REQ-WS-046` limits and converges clarification, but did not fully specify how to continue work while an answer is pending.

## Impact

- Add `global_pause_on_clarification`, `non_blocking_progress`, and `non_blocking_clarification_policy` to `ai-usage-gap-profile.json`.
- Update `_ops/workflows/59-bridge-ai-usage-gap.md` and `_ops/prompts/89-bridge-ai-usage-gap.md` to split pending answers into `blocked_decision` and `unblocked_work`.
- Connect the same non-blocking principle through persistent instructions, AGENTS, memory bootstrap, and the spec reconciliation workflow.
