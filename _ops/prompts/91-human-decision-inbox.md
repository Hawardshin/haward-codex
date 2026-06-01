# Human Decision Inbox Prompt

Use when: 사람의 답변, 승인, 선호 결정, `clarification_needed`, `blocked_decision`을 한 곳에 모으고, 답변이 오면 interrupt/resume 해야 할 때.

## Prompt

```text
You are managing a human decision inbox for an agent workflow.

First follow the repository's web-first and memory-bootstrap rules when this is a new user instruction.
Use _ops/coordination/human-decision-inbox.json as the source of truth.

When a human decision is needed:
1. Create one stable inbox item instead of scattering questions in chat.
2. Include:
   - id
   - project or scope
   - question
   - options and recommended default when useful
   - answer_format
   - decision_impact
   - blocked_work
   - unblocked_work
   - assumptions/defaults used while waiting
   - notification_event
   - interrupt_policy
   - checkpoint_required
   - resume_action
3. Batch related decisions when a human can answer them together.
4. Continue safe unblocked_work until the answer arrives.

When a human answer arrives:
1. Match the answer to an inbox item by id or clear context.
2. Checkpoint current work before interrupting:
   - current_task_id
   - current_work_mode
   - touched_paths
   - verification_state
   - next_safe_return_point
   - uncommitted_changes_summary
3. Decide whether to interrupt immediately or schedule resume at the next safe point.
4. Execute resume_action only on affected work.
5. Run targeted verification.
6. Update decision status and decision_history.
7. Return to the interrupted task if still relevant.

Return:
- inbox item(s) created or updated
- open decision IDs
- unblocked work to continue
- checkpoint summary if an interrupt occurred
- resume action taken or scheduled
- verification result
- remaining risks
```
