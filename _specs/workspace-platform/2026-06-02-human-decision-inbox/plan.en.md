# Plan: Human Decision Inbox

## Evidence Summary

- LangChain HITL shows interrupting at human decision points and resuming from checkpointed state.
- Microsoft Agent Framework AG-UI shows pending requests and resume payloads keyed by interrupt ID.
- Conductor Human Task defines workflow states that wait for an external human signal.
- GitHub issue dependencies expose blocked-by/blocking relationships so bottlenecks are visible.
- Existing `REQ-WS-047` created the principle of continuing work while waiting, but a central structure for collecting questions and resuming answered work is still needed.

## Execution Order

1. Add `REQ-WS-048` plus requirement change/review records.
2. Create the central inbox JSON and companion docs.
3. Add the human decision inbox workflow and prompt.
4. Update the AI usage gap profile, notification config, memory bootstrap, persistent instructions, `AGENTS.md`, router, and ops index.
5. Create web search records, research notes, plan, user request summary, trace, work summary, evaluation, and timing records.
6. Update coordination status and generated board.
7. Verify, commit, and push.

## Risks And Responses

- Risk: The inbox exists but future work still leaves questions scattered in chat.
- Response: Expose the inbox from memory bootstrap, router, index, and persistent instructions.
- Risk: Every answered question interrupts current work and creates a new bottleneck.
- Response: Separate `interrupt_now_when` from `schedule_resume_when`.
- Risk: Current work state is lost during context switching.
- Response: Require checkpoint fields before interrupts.
