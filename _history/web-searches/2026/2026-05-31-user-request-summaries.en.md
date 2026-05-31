# 2026-05-31 Web Search Record: User Request Summaries

## User Instruction Summary

The user asked to save summaries of the varied prompts and requests they made, even if full originals are not preserved.

## Search Execution

- Search time: 2026-05-31
- Queries:
  - `AI agent conversation memory user instruction summarization request logs best practices`
  - `LLM agent memory summarization user preferences instructions history durable notes paper`
  - `software project decision log user requests issue summaries changelog best practices`
  - `Microsoft Agent Framework memory persistence agents documentation`
  - `AgentMemory.md AI agent memory documentation`
  - `Memory Matters The Need to Improve Long-Term Memory in LLM-Agents AAAI paper`
  - `Keep a Changelog changelog format official`
- Search tool: Codex web search

## Sources Checked

| Source | Type | Checked | Used For |
| --- | --- | --- | --- |
| [Memory Matters](https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688) | paper | 2026-05-31 | Used the need for separating memory types in long-term agents. |
| [Microsoft Agent Framework Memory & Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | official docs | 2026-05-31 | Used the session state, context provider, and history provider pattern for persisted context. |
| [agentmemory.md](https://agentmemory.md/) | open-source tool docs | 2026-05-31 | Used the separation of decisions, goals, preferences, and work into structured memory types. |
| [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | documentation practice | 2026-05-31 | Used the principle that durable change records should be human-readable. |

## Excluded Or Weak Sources

| Source | Reason |
| --- | --- |
| Personal blogs/Reddit memory anecdotes | Useful as practical signals, but official docs and papers were stronger policy references. |
| Product-specific memory marketing docs | Too product-dependent to adopt directly as general repository policy. |

## Insights Applied To The Plan

- Store meaning, durability, and implementation locations rather than full original request text.
- Keep user request summaries as a separate layer from work summaries.
- Add `user_request_summary_targets` to close-out evaluation to prevent omissions.
- Treat older request summaries as fallible knowledge and validate them for important decisions.

## Public Decision Summary

User request summaries are the user-intent layer of long-term memory. A separate `_history/user-requests/` layer lets future agents inspect what the user asked for without preserving full chat transcripts.

## Links

- Request summary: `_history/user-requests/2026/2026-05-31.en.md`
- Plan record: `_history/plans/2026/2026-05-31-user-request-summaries.en.md`
- Work summary: `_history/work-summaries/2026/2026-05-31.en.md`
- Evaluation report: `_history/evaluations/2026/2026-05-31-user-request-summaries.en.md`
