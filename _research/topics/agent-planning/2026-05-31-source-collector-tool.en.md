# Source Collector Tool Research

## Research Purpose

Record evidence for an automation tool that reduces the repeated effort of collecting and organizing many web sources.

## Access Date

- 2026-05-31

## Sources

| Source | URL | Notes |
| --- | --- | --- |
| SearXNG documentation | https://docs.searxng.org/index.html | Self-hosted metasearch, search service aggregation, API candidate |
| SearXNG Search API | https://docs.searxng.org/dev/search_api.html | Candidate HTTP API for search results |
| Tavily Search API docs | https://docs.tavily.com/documentation/api-reference/endpoint/search | Agent-oriented search API with raw content and domain filters |
| SerpApi Search Index API | https://serpapi.com/search-index-api | Structured search result JSON candidate |
| OpenAI Web Search docs | https://platform.openai.com/docs/guides/tools-web-search | Reference for citations and URL annotations from web search results |

## Summary

- Automating web search requires provider choices, API keys, cost controls, rate limits, and privacy rules.
- SearXNG is a good candidate for self-hosted metasearch; Tavily and SerpApi are hosted API candidates.
- OpenAI web search results can expose citation and URL annotations for traceability.
- The safer first step is a provider-independent schema and local tool for source normalization, type classification, bundle coverage, scoring, and report generation.

## Insights

- Do not lock into a provider yet; stabilize the `sources` JSON schema first.
- The repeated work is often not search itself, but normalizing, classifying, scoring, and reporting sources.
- Adoption signals and factual evidence should be recorded separately.
- Future SearXNG, Tavily, SerpApi, or OpenAI adapters can feed the same schema.

## Plan Impact

- Create `_tools/source-collector/`.
- First version does not call the network; it accepts JSON input and produces Markdown/JSON reports.
- CLI commands: `init`, `check`, `report`.
- Tests cover bundle coverage, source type inference, and report rendering.

## Reliability Judgment

- SearXNG, Tavily, SerpApi, and OpenAI all provide official documentation relevant to search automation.
- Provider adoption should still compare cost, privacy, API stability, and rate limits.

## Uncertainty And Contrary Signals

- Depending on public SearXNG instances can create stability and policy issues.
- Hosted APIs introduce costs and vendor lock-in.
- Automated collection does not replace source quality judgment.

## Applicability

- Use after collecting multiple sources for research or planning work.
- Even without a search API adapter, paste web-tool or manual search results into JSON and generate a report.

## Related Work

- `_tools/source-collector/README.en.md`
- `_tools/source-collector/src/source_collector.py`
- `_docs/source-collection-policy.en.md`

## Next Checks

- If repeated use shows provider automation is necessary, evaluate SearXNG first.
- When adding provider adapters, document API key, cost, and privacy rules separately.
