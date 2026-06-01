# Web Search Record: Platform Description Narrative

## Search Purpose

Before responding to the user's request to write a more detailed and compelling platform description, I checked what agent-platform descriptions and strong technical documentation guidance tend to emphasize.

## Search Date

- Date: 2026-06-01
- Work mode: `standard`

## Queries

- `AI agent platform README value proposition governance memory evaluation documentation best practices`
- `agentic AI platform architecture memory tools evaluation governance description`
- `AI engineering agent platform product narrative knowledge base workflows evaluation`
- `developer documentation README overview value proposition best practices official style guide`
- `Google developer documentation style guide overview audience documentation`
- `Diataxis documentation framework explanation how-to reference tutorial concept`

## Sources Checked

| Source | Type | What Was Checked | Impact |
| --- | --- | --- | --- |
| NIST AI Risk Management Framework, https://www.nist.gov/itl/ai-risk-management-framework | Official framework | AI systems need governance, measurement, and management. | Included evaluation, rework, governance, and risk boundaries in the platform description. |
| Google PAIR People + AI Guidebook, https://pair.withgoogle.com/guidebook/ | Official guide | AI products should be designed around user goals, trust, feedback, and failure handling. | Emphasized user intent, final authority, and resumable structure. |
| Anthropic Building Effective Agents, https://www.anthropic.com/engineering/building-effective-agents | Engineering article | Effective agents benefit from simple composable patterns, clear tool use, and evaluation. | Reflected capability promotion into tools, skills, and agents. |
| OpenAI Evals, https://github.com/openai/evals | Open-source/official | Model and agent behavior should be checked through repeatable evaluation. | Positioned evaluator and hallucination guard as core platform capabilities. |
| Google Developer Documentation Style Guide, https://developers.google.com/style/ | Official style guide | Technical documentation should be clear and consistent for practitioners. | Made the README open with identity and user context rather than only rules. |
| Diataxis, https://diataxis.fr/ | Documentation framework | Documentation serves different reader needs: tutorials, how-to guides, reference, and explanation. | Added `platform-identity-operating-model` as an explanation-style document. |

## Weak Sources Ignored

- Commercial agent-platform landing pages were used only as expression signals, not factual evidence.
- Generic SEO-style “AI agent best practices” pages were excluded from planning evidence.

## Plan Impact

- Add a stronger first-read platform description to the root README.
- Add `_docs/operating-models/platform-identity-operating-model.*.md` as a durable explanation document.
- Improve `agent-platform/README.md` so the core project is described as a reusable platform layer.
- Add the platform identity document to memory bootstrap as a warm anchor.

## Uncertainty

- “Compelling” is subjective. This change prioritizes clear technical narrative and platform identity; the tone can later be shifted toward product landing copy, a manifesto, or concise reference copy.
