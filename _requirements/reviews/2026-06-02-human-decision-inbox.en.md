# Human Decision Inbox Requirement Review

## Review Target

- Requirement: `REQ-WS-048`
- Change record: `_requirements/changes/2026-06-02-human-decision-inbox.en.md`

## Decision

Accepted.

## Rationale

The request is the next step after `REQ-WS-047`. A rule that says "keep working while waiting for an answer" is not enough if the actual questions and resume conditions remain scattered through chat. Human-needed decisions need a central inbox and a state contract that says what is blocked, what can continue, and how answered work resumes.

This requirement sets these boundaries:

- Do not leave questions only in chat; create inbox records.
- Separate work that needs the answer from work that can continue now.
- Checkpoint current work before resuming an answered decision.
- Choose immediate interrupt or next-safe-point resume by priority and risk.
- Update inbox status and `decision_history` after resume.

## Verification Criteria

- `REQ-WS-048` exists in the requirements baseline.
- Central inbox JSON, workflow, and prompt exist.
- The AI usage gap profile and persistent instructions reference the inbox and interrupt/resume rule.
- Notification config includes human decision events.
- Evaluation compares the initial request against the result.
