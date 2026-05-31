# Work Evaluation Report: Source Collector Tool

## Initial Instruction

- "이걸 계속 반복하는게 힘들다면 자료를 최대한 많이 모을 수 있게 직접 프로그램을 만드는 것도 방법이야."

## Result Summary

- Added `_tools/source-collector/`, a Python CLI tool.
- The tool provides `init`, `check`, and `report` commands.
- Given JSON from search results or manual research, it produces source bundle coverage, quality scores, adoption signal scores, Markdown reports, and JSON summaries.
- The first version does not call search APIs directly; it stabilizes a provider-independent schema first.
- Future SearXNG, Tavily, SerpApi, and OpenAI web search adapters are documented as extensions.
- Added Korean and English README files, example JSON, unit tests, research notes, and plan history.

## References Checked

- SearXNG docs: https://docs.searxng.org/index.html
- SearXNG Search API: https://docs.searxng.org/dev/search_api.html
- Tavily Search API: https://docs.tavily.com/documentation/api-reference/endpoint/search
- SerpApi Search Index API: https://serpapi.com/search-index-api
- OpenAI Web Search docs: https://platform.openai.com/docs/guides/tools-web-search
- Plan history: `_history/plans/2026/2026-05-31-source-collector-tool.en.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/source-collector-grounding.json`
- Result: `ready_to_publish`
- Gaps: none

## Verification

- Web search was performed before local file edits.
- `python3 -m unittest discover -s _tools/source-collector/tests`: 4 tests passed
- `python3 _tools/source-collector/src/source_collector.py init /tmp/source-collector-template.json --topic "agent search automation" --purpose "Collect source bundle." --access-date 2026-05-31`: OK
- `python3 _tools/source-collector/src/source_collector.py check _tools/source-collector/examples/source-bundle-template.json`: OK
- `python3 _tools/source-collector/src/source_collector.py report _tools/source-collector/examples/source-bundle-template.json --output /tmp/source-collector-report.md --json-output /tmp/source-collector-report.json`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/source-collector-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/source-collector-evaluation.json`: `ready_to_close`
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23 tests passed
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated

Some Python commands emitted a Homebrew shellenv `/bin/ps: Operation not permitted` warning, but the commands succeeded.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- Instruction alignment: a direct program now exists to reduce repeated source collection and reporting work.

## Gaps

- None

## Improvements

- If live search API integration becomes frequent, evaluate a SearXNG adapter first.

## Follow-Up Actions

- No blocking follow-up remains.

## Rework Result

- The first test run showed that `contrary=true` sources were not counted in bundle coverage.
- `bundle_coverage` now counts both `source_type=contrary` and `contrary=true`, and tests pass.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-source-collector-tool.en.md`
- Created: 2026-05-31
