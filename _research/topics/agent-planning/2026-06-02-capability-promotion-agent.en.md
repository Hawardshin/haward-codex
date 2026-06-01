# Capability Promotion Agent Research Note

## Core Conclusion

Automatic feature addition should not mean making features arbitrarily. It should observe repetition, create candidates for the smallest reusable asset, and execute only within risk-based limits.

## Evidence

- Anthropic's agent engineering article supports preferring clear workflows and simple composable patterns before complex autonomous agents.
- OpenAI Agents SDK documentation provides guardrail, tracing, human-in-the-loop, and handoff concepts that support internal records and human checkpoints.
- NIST AI RMF is useful for risk tier and governance framing.
- LangChain multi-agent and human-in-the-loop documentation helps design role separation and approval points.

## Platform Impact

- Automate candidate discovery.
- Limit execution by risk.
- Check the smallest capability type first.
- Route high-risk changes to the human decision inbox.
- Preserve validation, evaluation, rollback, commit, and push traces.

## Reuse Value

Use this note when building a future monitor capability-candidate board or background detector/worker.
