# User Request Summary References

## Question

What structure should preserve the user's varied instructions and prompts for future reuse without storing full original text?

## Sources Checked

| Source | Type | Checked | Use |
| --- | --- | --- | --- |
| [Memory Matters](https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688) | paper | 2026-05-31 | Used the need for memory type separation in long-term agents. |
| [Microsoft Agent Framework Memory & Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | official docs | 2026-05-31 | Used the session state, context provider, and history provider pattern for persisted context. |
| [agentmemory.md](https://agentmemory.md/) | open-source tool docs | 2026-05-31 | Used the separation of decisions, goals, preferences, and work into structured memory types. |
| [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | documentation practice | 2026-05-31 | Used the principle that durable records should be human-readable. |

## Insights

- User request summaries are different from work summaries. Work summaries answer "what did we do"; request summaries answer "what did the user want".
- Full-text preservation increases cost and sensitive-data risk, so meaning summaries are the default.
- Summaries should include request order, intent type, durability, implementation location, and related links.
- `work-evaluator-agent` can reduce omissions by checking `user_request_summary_targets`.
- Start with flat files, but leave room to promote request summaries into a graph/search memory tool if the project count and request volume grow.

## Application

- Add `_history/user-requests/` as the user request summary layer.
- Add bilingual templates under `_templates/user-request-summary/`.
- Add `_docs/user-request-summary-policy.*`.
- Add `user_request_summary_targets` to `work-evaluator-agent`.

## Uncertainty

Request summaries compress the original text, so nuance can be lost. Important decisions should use related history, evaluation reports, commits, or current user confirmation.
