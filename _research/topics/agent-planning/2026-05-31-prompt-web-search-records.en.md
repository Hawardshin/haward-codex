# Prompt-Level Web Search Records

## Question

What structure should be used when every prompt execution must start with web search and leave a user-verifiable text record of the search process?

## Sources Checked

| Source | Type | Checked | Use |
| --- | --- | --- | --- |
| [OpenAI Web search docs](https://platform.openai.com/docs/guides/tools-web-search) | official docs | 2026-05-31 | Used the search call, query, URL citation annotation, and inline citation model. |
| [Anthropic Search results docs](https://docs.anthropic.com/en/docs/build-with-claude/search-results) | official docs | 2026-05-31 | Used the structured source/title/content pattern and citation-enabled attribution. |
| [Firebase AI Logic: Grounding with Google Search](https://firebase.google.com/docs/ai-logic/grounding-google-search) | official docs | 2026-05-31 | Used the grounding metadata pattern containing search queries, results, and source display requirements. |

## Insights

- Prompt-level web search records should be close-out artifacts, not casual logs.
- Standard fields should include `queries`, `sources_checked`, `ignored_sources`, `insights_applied`, `uncertainty`, and `public_decision_summary`.
- Store user-verifiable public search reasoning summaries instead of raw internal reasoning.
- The work evaluator should treat missing `web_search_record_targets` as a blocking gap.
- Search results and citations are verification handles; titles or popularity signals alone are not evidence.

## Application

- Add a common prompt contract to `_ops/prompts/README.ko.md`.
- Use `_history/web-searches/` as the web search record store.
- Add Korean and English templates under `_templates/web-search-record/`.
- Add `web_search_record_targets` to the `work-evaluator-agent` input and validation code.

## Uncertainty

This note is based on official documentation. The amount of query and citation metadata available depends on the runtime and API used by a specific tool.
