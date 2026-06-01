# Non-Blocking Clarification Requirement Review

## Review Target

- Requirement: `REQ-WS-047`
- Change record: `_requirements/changes/2026-06-02-non-blocking-clarification.en.md`

## Decision

Accepted.

## Rationale

The request is a direct follow-up to `REQ-WS-046`. It is not enough to ask better questions and bound the question loop. If an unanswered question stops unrelated work, the AI workflow becomes slower and more brittle than the human process it is supposed to improve.

The accepted boundary is:

- Pause only the decision that needs the answer.
- Continue safe independent research, drafting, option comparison, and validation.
- Mark assumptions so they can be corrected later.
- When the answer arrives, patch only affected work instead of restarting the whole task.
- Still pause irreversible or high-risk work.

## Validation Criteria

- `REQ-WS-047` exists in the requirements baseline.
- The AI usage gap profile includes a non-blocking clarification policy.
- Workflow, prompt, persistent instructions, and AGENTS include `blocked_decision`, `unblocked_work`, and `resume_action`.
- Evaluation confirms the rule addresses the user's stated bottleneck.
