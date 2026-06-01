# Plan: Profit Analyst Agent

## Implementation Sequence

1. Save web-search records and research notes.
2. Add requirement `REQ-WS-066`.
3. Create `agent-platform/configs/agents/profit-analyst-agent.json`.
4. Create `agent-platform/docs/profit-analyst-agent.ko.md` and `.en.md`.
5. Connect specs, request trace, work summary, and timing record.
6. Run verification commands.
7. Save omission, grounding, and evaluation records.
8. Commit and push.

## Risks

- Money-side judgment could collapse into one ROI number or false precision.
- The agent could be misread as personal investment, tax, legal, or accounting advice.
- Profit upside could be used to deprioritize quality and safety.

## Mitigation

- Add assumptions, source provenance, scenario/sensitivity, professional review, and human checkpoint rules to the agent policy.
- Include non-financial constraints and verification gates in the output contract.
