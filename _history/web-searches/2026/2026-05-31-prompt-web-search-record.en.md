# 2026-05-31 Web Search Record: Prompt-Level Web Search Records

## User Instruction Summary

The user instructed that every prompt must always begin with web search and that the reasoning process should be recorded in text.

## Search Execution

- Search time: 2026-05-31
- Queries:
  - `OpenAI web search tool citation grounding official docs`
  - `Anthropic Claude web search citations official documentation`
  - `Google Search grounding AI official documentation`
- Search tool: Codex web search

## Sources Checked

| Source | Type | Checked | Used For |
| --- | --- | --- | --- |
| [OpenAI Web search docs](https://platform.openai.com/docs/guides/tools-web-search) | official docs | 2026-05-31 | Used the structure of search calls, cited URL annotations, and inline citations. |
| [Anthropic Search results docs](https://docs.anthropic.com/en/docs/build-with-claude/search-results) | official docs | 2026-05-31 | Used the source/title attribution and citation-enabled search result structure. |
| [Firebase AI Logic: Grounding with Google Search](https://firebase.google.com/docs/ai-logic/grounding-google-search) | official docs | 2026-05-31 | Used grounding metadata, web results, and source display requirements. |

## Excluded Or Weak Sources

| Source | Reason |
| --- | --- |
| Reddit/SEO search results | Useful as operational signals, but weaker than official documentation for this policy. |

## Insights Applied To The Plan

- Every prompt execution should inherit a common contract to record web search.
- Final artifacts should include queries, sources, applied insights, and public decision summaries, not private raw reasoning.
- Close-out evaluation should treat missing `web_search_record_targets` as a blocking gap.

## Public Decision Summary

Web search is the default first step for freshness and grounding. Recording prompt-level search evidence lets the user see why a direction was chosen and prevents future agents from repeating the same discovery work.

## Links

- Work summary: `_history/work-summaries/2026/2026-05-31.en.md`
- Plan record: `_history/plans/2026/2026-05-31-prompt-web-search-record.en.md`
- Evaluation report: `_history/evaluations/2026/2026-05-31-prompt-web-search-record.en.md`
