# Plan: Non-Blocking Clarification

## Evidence Summary

- Elastic HITL docs describe human review at critical decision points.
- GitHub issue dependency docs make blocked-by and blocking relationships explicit for bottleneck tracking.
- Zapier HITL status docs show that the rest of a workflow can continue while a human-in-the-loop step waits.
- Existing `REQ-WS-046` covers clarification convergence, but needs a stronger rule for continuing independent work while an answer is pending.

## Sequence

1. Add `REQ-WS-047` plus change/review records.
2. Add the gap pattern, intervention, and policy to the AI usage gap profile.
3. Update the operating model, workflow, prompt, persistent instructions, and AGENTS.
4. Reflect non-blocking progress in the spec/source reconciliation path.
5. Update memory bootstrap, router, and operations index.
6. Write web search records, research notes, request summary, trace, work summary, evaluation, and timing records.
7. Validate, commit, and push.

## Risks And Controls

- Risk: the agent may misclassify dependent versus independent work.
- Control: require `blocked_decision_record_fields` and `resume_action`.
- Risk: unsafe work may continue while an answer is pending.
- Control: use `block_only_when` for irreversible or high-risk decisions.
