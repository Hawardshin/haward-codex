# Web Search Record: Bounded Clarification Loop

## Search Purpose

The user said vague instructions should cause the AI to ask clarifying counter-questions, but endless questioning is also harmful. I checked evidence on ambiguous instruction handling, clarification questions, and fallback/convergence.

## Search Date

- Date: 2026-06-01
- Work mode: `governance`

## Queries

- `official prompt engineering ask clarifying questions ambiguous user request limit clarification questions AI assistant`
- `conversational AI design ask clarifying questions ambiguity user intent official guidelines`
- `human computer interaction clarification questions ambiguous instructions AI assistant research`
- `prompt engineering clarify ambiguous requirements ask follow up questions best practices`
- `TaskLint Automated Detection of Ambiguities in Task Instructions ambiguity instructions accuracy`

## Key Sources Checked

| Source | Type | Finding | Applied To |
| --- | --- | --- | --- |
| Microsoft Copilot Studio, “Disambiguate customer intent”, https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-disambiguate-intent | Official docs | Uses clarification questions to narrow ambiguous user intent across possible topics and provides fallback/handoff when options do not fit. | Designed clarification with fallback/convergence |
| OpenAI, “Best practices for prompt engineering with the OpenAI API”, https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api | Official docs | Emphasizes clear and specific instructions plus desired output format/examples. | Used for task-brief specificity |
| Microsoft Azure/OpenAI prompt engineering, https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering | Official docs | Explains prompt sensitivity and the importance of clear instruction structure. | Treated question quality as output-condition design |
| TaskLint, https://ojs.aaai.org/index.php/HCOMP/article/view/21996 | Research | Studies ambiguity in task instructions and its relationship to task accuracy. | Evidence for detecting and resolving ambiguity before execution |
| CLAM, https://arxiv.org/abs/2212.07769 | Research | Proposes selective clarification for ambiguous questions before final answering. | Clarification should be selective, not automatic for every gap |

## Weak Sources Ignored

- Generic “how to ask AI better questions” blog posts were excluded because source quality was low.
- Commercial chatbot UX landing pages were treated as expression references only, not policy evidence.

## Plan Impact

- Added `REQ-WS-046`.
- Added `bounded_clarification_policy` to `ai-usage-gap-profile.json`.
- Added question budget, maximum question count, and convergence strategy to workflow and prompt.
- Added a durable rule to persistent instructions and AGENTS: ask when needed, but prevent endless clarification loops.

## Uncertainty

- What counts as a material question depends on the task context. The policy therefore uses priority and budget rules instead of a fixed universal question list.
