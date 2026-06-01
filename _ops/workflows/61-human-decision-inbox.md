# Human Decision Inbox Workflow

## Purpose

Collect human decisions in one place, keep unrelated work moving, and resume affected work when the human answer arrives.

## Inputs

- User request or answer
- `_ops/coordination/human-decision-inbox.json`
- Related `blocked_decision`, `clarification_needed`, approval, or preference decision
- Current task state and touched paths

## Sequence

1. Run web-first intake and memory bootstrap when this workflow is triggered by a new user instruction.
2. If a new human decision is needed, create or update one inbox record in `_ops/coordination/human-decision-inbox.json`.
3. Include:
   - stable `id`
   - `question`
   - options and recommended default when useful
   - `answer_format`
   - `decision_impact`
   - `blocked_work`
   - `unblocked_work`
   - `assumptions`
   - `notification_event`
   - `interrupt_policy`
   - `checkpoint_required`
   - `resume_action`
4. Batch related questions when they can be answered together.
5. While decisions are open, continue safe `unblocked_work`.
6. When the user answer arrives, match it to the inbox record by ID or by clear context.
7. Before interrupting current work, checkpoint:
   - current task ID
   - current work mode
   - touched paths
   - verification state
   - next safe return point
   - uncommitted changes summary
8. Decide resume timing:
   - interrupt immediately for critical/high-priority decisions that unblock the user's current goal or reduce risk;
   - schedule for the next safe point when current work should not be interrupted mid-edit.
9. Run `resume_action` only on affected work.
10. Run targeted verification.
11. Update inbox status to `resumed`, `deferred`, `cancelled`, or `superseded`, and add a `decision_history` entry.
12. Return to the interrupted task if it is still relevant.

## Output Contract

- Inbox record path
- Open decision IDs
- Current `unblocked_work`
- Checkpoint summary when an interrupt happens
- Resume action taken or scheduled
- Verification result
- Updated inbox status

## Rule

Human decisions are workflow events, not loose chat messages. The agent should keep working until a real dependency needs human input, then resume precisely when the answer arrives.
