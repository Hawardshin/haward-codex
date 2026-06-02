# Web Search Record: Capability Idea Evaluation

## Request

- Request ID: `UR-2026-06-02-029`
- Summary: The user clarified that the platform should generate ideas and have those ideas evaluated.
- Work mode: `governance`

## Queries

- `idea generation evaluation framework innovation funnel evidence scoring official guide`
- `design thinking ideation evaluation selection criteria official guide`
- `agentic workflows evaluator optimizer idea generation evaluation loop official docs`
- `innovation portfolio idea screening scoring criteria stage gate official`

## Sources Checked

- AWS Prescriptive Guidance, evaluator and reflect-refine loops: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/workflow-for-evaluators-and-reflect-refine-loops.html
- Google Cloud Gemini Enterprise Idea Generation agent: https://docs.cloud.google.com/gemini/enterprise/docs/idea-generation
- OpenAI Agents/Evals documentation search result: https://platform.openai.com/docs/guides/agents
- Stage-Gate Innovation Performance Framework: https://www.stage-gate.com/about/stage-gate-innovation-performance-framework/
- Anthropic Building Effective Agents: https://www.anthropic.com/engineering/building-effective-agents

## Plan Impact

- Separated generation from evaluation.
- Required multiple ideas before promotion when the problem is non-trivial.
- Added evaluation criteria: repetition reduction, time savings, maintenance cost, evidence strength, risk fit, and smallest-asset fit.
- Required selected/rejected/queued/human-review outcomes and reasons.

## Public Decision Summary

Automatic improvement should not only generate ideas. It should create multiple ideas, evaluate them against explicit criteria, and keep reasons for unselected ideas so the system remains maintainable and trustworthy.
