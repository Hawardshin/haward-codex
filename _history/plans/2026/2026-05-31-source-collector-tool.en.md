# Source Collector Tool Plan

## Initial Request

- "이걸 계속 반복하는게 힘들다면 자료를 최대한 많이 모을 수 있게 직접 프로그램을 만드는 것도 방법이야."

## Plan Purpose

- Create a Python tool that reduces repeated source collection and reporting work.
- First version should avoid locking into a search provider and instead normalize, score, and report source JSON.

## Search Questions

- Which search APIs or open-source tools can help collect many sources?
- Is it safer to add provider adapters now or stabilize a provider-independent schema first?
- How should the tool connect to the existing source collection policy?

## Search Channels

- Web search
- Official documentation
- Repository search for existing tool patterns

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| SearXNG docs | https://docs.searxng.org/index.html | Self-hosted metasearch candidate |
| SearXNG Search API | https://docs.searxng.org/dev/search_api.html | HTTP API candidate |
| Tavily Search API | https://docs.tavily.com/documentation/api-reference/endpoint/search | Hosted search API candidate |
| SerpApi Search Index API | https://serpapi.com/search-index-api | JSON search result candidate |
| OpenAI Web Search docs | https://platform.openai.com/docs/guides/tools-web-search | Citations and URL annotations reference |
| Existing tool structure | `_tools/workspace-index/`, `_tools/task-board/` | Python standard-library CLI pattern |

## Knowledge-Base Validation

- Internal operating docs are used as evidence, so validate them with `knowledge-skeptic-agent`.
- Validation targets: `_docs/policies/source-collection-policy.ko.md`, `_tools/README.md`, `_ops/workflows/05-web-first-intake.md`, `_ops/workflows/55-research-insight-planning.md`
- Expected result: `ready_to_reference`

## Insights

- Direct provider integration introduces API key, cost, privacy, and rate-limit decisions.
- A stable JSON schema and deterministic report generator can process current web tool output now and support provider adapters later.
- Repeated cost often comes from classifying, checking coverage, scoring, and writing reports rather than search itself.

## Plan Steps

1. Create `_tools/source-collector/`.
2. Implement `init`, `check`, and `report` commands in `source_collector.py`.
3. Calculate source type coverage, quality score, and adoption signal score.
4. Add Korean and English README files and example JSON.
5. Add unit tests.
6. Link the tool from source collection policy and workflows.
7. Save research notes, history, and evaluation reports.
8. Verify, commit, and push.

## Excluded Or Deferred Options

- Do not call live web search APIs in the first version.
- Add SearXNG, Tavily, SerpApi, or OpenAI adapters after provider and credential policies are decided.

## Risks And Uncertainty

- JSON input still needs to be filled manually, so this is not full automation yet.
- Scores are decision aids, not truth guarantees.
- Adoption signals can be biased, so they stay separate.

## Verification Methods

- `python3 -m unittest discover -s _tools/source-collector/tests`
- `python3 _tools/source-collector/src/source_collector.py init ...`
- `python3 _tools/source-collector/src/source_collector.py check ...`
- `python3 _tools/source-collector/src/source_collector.py report ...`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Deferred provider adapters and implemented a local normalizer/report tool first | Reduce repeated work while avoiding premature API/cost/privacy decisions |
