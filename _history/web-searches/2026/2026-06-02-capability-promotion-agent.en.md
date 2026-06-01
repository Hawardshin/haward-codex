# Web Search Record: Capability Promotion Agent

## Request

- Request ID: `UR-2026-06-02-028`
- Summary: The user asked for black-box-like handling where the platform adds useful features by itself while doing varied work.
- Work mode: `governance`

## Queries

- `agentic workflows self-improving agents tool creation guardrails official docs 2025`
- `autonomous software agents self improvement tool generation evaluation safeguards research paper`
- `NIST AI RMF autonomous AI agents tool use monitoring guardrails`
- `LangChain agents tool calling human in the loop guardrails durable memory docs`
- `Anthropic Building effective agents workflows tools evaluator optimizer official blog`
- `OpenAI agents SDK tracing guardrails human in the loop docs tool approval`
- `Microsoft AI agents evaluation monitoring human oversight documentation`

## Sources Checked

- Anthropic, "Building Effective Agents" (2024-12-19): https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Agents SDK Documentation: https://openai.github.io/openai-agents-python/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- LangChain Multi-agent Documentation: https://docs.langchain.com/oss/python/langchain/multi-agent
- LangChain Human-in-the-loop Documentation: https://docs.langchain.com/oss/python/langchain/human-in-the-loop
- Microsoft Agent Factory / Microsoft 365 Agents SDK documentation pages were checked as ecosystem references.

## Weak Sources Ignored

- Generic blogs and vendor marketing posts were useful for discovery but not used as policy anchors.
- Likes, stars, and community reactions were treated only as adoption signals, not factual proof.

## Plan Impact

- Anthropic's workflow/agent distinction and composable pattern advice informed the smallest-asset-first order: `prompt -> workflow -> template -> tool -> skill -> agent -> project_feature`.
- OpenAI Agents SDK concepts around guardrails, tracing, and human-in-the-loop informed the observation, risk, validation, rollback, evaluation, and trace requirements.
- NIST AI RMF informed the risk-tier and governance-checkpoint posture.
- LangChain multi-agent and human-in-the-loop docs helped check role separation and interrupt/resume approval structure.

## Uncertainty

- No background worker or UI auto-candidate feature was implemented in this change.
- This change creates the operating contract, agent spec, registry, docs, and validation path first.

## Public Decision Summary

Fully opaque automatic feature addition is unsafe for this platform. The better fit is bounded black-box capability promotion: the user-facing experience may feel automatic, but internal records, risk classification, human checkpoints, validation, rollback, and evaluation must remain auditable.
