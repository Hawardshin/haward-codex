# AI Usage Gap And Bridge

## Summary

The gap between strong and weak AI use is not just prompt wording. Research and practitioner reports point to task-fit judgment, context and success criteria, iteration, verification, durable asset creation, and calibrated reliance.

## Weak Usage Patterns

- Vague requests without goal, audience, constraints, or criteria.
- One-shot use: accepting one answer blindly or abandoning the tool immediately.
- Poor task-fit judgment: assigning work to AI without checking capability or verification.
- Missing verification: using outputs without sources, tests, contrary checks, or human review.
- Context loss: useful prompts and decisions remain only in chat.
- Tool avoidance: repeatable deterministic work stays manual.
- Hidden use: AI is used privately without shared standards.

## Strong Usage Patterns

- Clear goal, audience, input material, constraints, and success criteria.
- AI used as explorer, drafter, critic, transformer, and verification assistant.
- Work split into planning, evidence gathering, implementation, validation, and evaluation.
- Web search, official docs, tests, evaluators, and human judgment used together.
- AI capability treated as uneven across tasks.
- Repeated useful patterns become repository assets.

## Platform Integration

- Add `agent-platform/configs/usage/ai-usage-gap-profile.json`.
- Add `_ops/workflows/59-bridge-ai-usage-gap.md` and `_ops/prompts/89-bridge-ai-usage-gap.md`.
- Register the profile as a warm memory anchor.
- Explain the AI-use gap as a work-system design problem, not a personal flaw.

## Application Rules

- Improve vague requests with goal, context, constraints, examples, and criteria.
- Make reasonable assumptions for low-risk ambiguity.
- Use `clarification_needed` for high-risk or preference-sensitive ambiguity.
- Promote useful AI-use patterns into the smallest durable asset.

## Key Sources

- Harvard Business School, BCG: https://www.hbs.edu/faculty/Pages/item.aspx?num=64700
- BCG: https://www.bcg.com/publications/2023/how-people-create-and-destroy-value-with-gen-ai
- Microsoft Work Trend Index 2026: https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization
- Microsoft Work Trend Index 2024: https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part
- Gallup AI Indicator: https://www.gallup.com/699797/indicator-artificial-intelligence.aspx
- OECD AI skills gap: https://www.oecd.org/en/publications/bridging-the-ai-skills-gap_66d0702e-en.html
- UNESCO AI competency framework: https://www.unesco.org/en/articles/ai-competency-framework-students?hub=750
- Microsoft Appropriate Reliance: https://www.microsoft.com/en-us/research/articles/appropriate-reliance-research-initiative
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- IBM Research: https://research.ibm.com/publications/building-appropriate-mental-models-what-users-know-and-want-to-know-about-an-agentic-ai-chatbot
