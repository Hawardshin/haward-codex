# Research Note: Bounded Clarification Loop

## Summary

Vague instructions make good results harder. But an agent that keeps asking questions slows the work down. The useful structure is: ask only when needed, ask briefly, and converge through assumptions, defaults, ship-first confirmation, or deferral when answers do not arrive.

## Application Principles

- Ask only for uncertainty that would change the result.
- Usually ask one round, and at most two.
- Ask no more than three questions in one round.
- State decision impact or provide options for each question.
- Do not ask for information that local files, specs, search, or tests can answer.
- If there is no answer, choose reasonable assumptions, recommended defaults, ship-first-then-confirm, or explicit deferral.

## Reuse Value

Use this policy whenever deciding whether to ask clarifying questions and when to stop asking.

## Sources

- https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-disambiguate-intent
- https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
- https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
- https://ojs.aaai.org/index.php/HCOMP/article/view/21996
- https://arxiv.org/abs/2212.07769
