# Request Trace: Non-Blocking Clarification

## Request

- ID: `UR-2026-06-02-001`
- Summary: Reduce the bottleneck where pending clarification answers stop all work.

## Result

- Added `REQ-WS-047`.
- Added `global_pause_on_clarification`, `non_blocking_progress`, and `non_blocking_clarification_policy` to the AI usage gap profile.
- Updated workflow, prompt, operating model, persistent instructions, and AGENTS to require `blocked_decision`, `unblocked_work`, `assumptions`, and `resume_action`.
- Updated the spec/source reconciliation path so only related specs/source wait while independent work can continue.

## Artifacts

- `_requirements/changes/2026-06-02-non-blocking-clarification.en.md`
- `_requirements/reviews/2026-06-02-non-blocking-clarification.en.md`
- `_specs/workspace-platform/2026-06-02-non-blocking-clarification/`
- `_history/web-searches/2026/2026-06-02-non-blocking-clarification.en.md`
- `_research/topics/agent-planning/2026-06-02-non-blocking-clarification.en.md`
- `_history/evaluations/2026/2026-06-02-non-blocking-clarification.en.md`

## Evaluation

- Input: `_history/evaluations/2026/2026-06-02-non-blocking-clarification-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-02-non-blocking-clarification-grounding.json`

## Commit

- `60e458e` docs(ai-usage): prevent global clarification blocking
