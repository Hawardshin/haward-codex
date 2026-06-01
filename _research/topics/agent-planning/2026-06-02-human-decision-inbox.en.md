# Research Note: Human Decision Inbox And Interrupt Resume

## Core Conclusion

Human-needed answers should be handled as explicit dependency records, not as a global pause for all work. A useful structure includes:

- answerable question
- blocked work
- still-unblocked work
- notification event
- checkpoint requirement
- resume action
- decision history

## External Evidence Checked

- LangChain Human-in-the-Loop: interrupts tool calls that need human decisions and resumes from checkpointed state.
- Microsoft Agent Framework AG-UI workflows: uses interrupt-oriented pending requests and resume payloads.
- Conductor Human Task: defines human task states that wait for an external human signal.
- GitHub issue dependencies: makes blocked-by/blocking relationships visible.

## Platform Application

- Use `_ops/coordination/human-decision-inbox.json` as the source of truth.
- Use `_ops/workflows/61-human-decision-inbox.md` to unify new decision registration and answered-decision resume flow.
- Use `_ops/prompts/91-human-decision-inbox.md` as the English prompt body for actual execution.
- Use notification events `human_decision_needed`, `human_decision_answered`, and `resume_ready`.

## Cautions

- This structure does not automate every decision.
- Immediate interrupt is not always correct after a human answers.
- If current work is in an unsafe edit, checkpoint and resume at the next safe point.
- After applying an answer, change only affected work and run targeted verification.
