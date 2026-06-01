# Web Search Record: Human Decision Inbox

## Request

- Date: 2026-06-02
- User request: Build a structure that collects human-needed decisions at once, keeps other work moving while waiting, and safely interrupts/resumes affected work after the human answers.
- Work mode: `governance`

## Queries

- `human in the loop agent workflow interrupt resume pending user decisions inbox`
- `workflow engine human task wait state resume on signal interrupt current work`
- `async human approval workflow queue resume process after approval`
- `agent human feedback interrupt resume workflow pending decisions`

## Checked Sources

| Source | Type | Checked For | Impact |
| --- | --- | --- | --- |
| LangChain Human-in-the-Loop | Official docs | Interrupting for tool review and resuming from checkpointed state with human decisions | Added `interrupt_policy`, `checkpoint_required`, and `resume_action` fields |
| Microsoft Agent Framework AG-UI workflows | Official docs | Pending requests and resume payloads keyed by interrupt ID | Matched answers by decision ID and tracked resume state |
| Conductor Human Task | Official docs | Workflow states waiting for an external human signal | Kept only the affected decision in a waiting state |
| GitHub issue dependencies | Official docs | Explicit blocked-by/blocking relationships | Split `blocked_work` from `unblocked_work` in inbox records |

## Weak Sources Ignored

- General blog posts were not used as primary evidence for this governance change.
- The adopted evidence is limited to official docs and existing repository requirements.

## Plan Impact

- Designed a stateful inbox JSON instead of a loose question list.
- Split immediate interrupt from next-safe-point resume with `interrupt_now_when` and `schedule_resume_when`.
- Added a batching rule so related questions can be answered together.

## Uncertainty

- This change creates operating structure and rules; it is not a standalone runtime scheduler.
- Actual interrupt timing still requires agent judgment based on risk, priority, and current file-editing state.

## Public Decision Summary

The bottleneck is not solved only by asking better questions. The platform needs a central inbox, blocked/unblocked work separation, and checkpoint-based resume behavior when human answers arrive.
