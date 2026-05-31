# 작업 평가 보고서: Source Collector 도구

## 초기 지시

- "이걸 계속 반복하는게 힘들다면 자료를 최대한 많이 모을 수 있게 직접 프로그램을 만드는 것도 방법이야."

## 결과 요약

- `_tools/source-collector/` Python CLI 도구를 추가했다.
- 도구는 `init`, `check`, `report` 명령을 제공한다.
- 검색 결과나 수동 조사 결과를 JSON으로 넣으면 출처 묶음 coverage, quality score, adoption signal score, Markdown/JSON 보고서를 만든다.
- 첫 버전은 실제 검색 API를 호출하지 않고 provider 독립 schema를 먼저 고정한다.
- SearXNG, Tavily, SerpApi, OpenAI web search adapter는 향후 확장으로 문서화했다.
- README 한국어/영어, 예제 JSON, unit test, 리서치 노트, 계획 히스토리를 추가했다.

## References Checked

- SearXNG docs: https://docs.searxng.org/index.html
- SearXNG Search API: https://docs.searxng.org/dev/search_api.html
- Tavily Search API: https://docs.tavily.com/documentation/api-reference/endpoint/search
- SerpApi Search Index API: https://serpapi.com/search-index-api
- OpenAI Web Search docs: https://platform.openai.com/docs/guides/tools-web-search
- 계획 기록: `_history/plans/2026/2026-05-31-source-collector-tool.ko.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/source-collector-grounding.json`
- 결과: `ready_to_publish`
- gaps: 없음

## 검증

- 웹 검색을 먼저 수행한 뒤 로컬 파일을 수정했다.
- `python3 -m unittest discover -s _tools/source-collector/tests`: 4개 테스트 통과
- `python3 _tools/source-collector/src/source_collector.py init /tmp/source-collector-template.json --topic "agent search automation" --purpose "Collect source bundle." --access-date 2026-05-31`: 성공
- `python3 _tools/source-collector/src/source_collector.py check _tools/source-collector/examples/source-bundle-template.json`: 성공
- `python3 _tools/source-collector/src/source_collector.py report _tools/source-collector/examples/source-bundle-template.json --output /tmp/source-collector-report.md --json-output /tmp/source-collector-report.json`: 성공
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/source-collector-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/source-collector-evaluation.json`: `ready_to_close`
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23개 테스트 통과
- `python3 _tools/workspace-index/src/workspace_index.py`: 맵 갱신
- `python3 _tools/task-board/src/task_board.py`: 조정 보드 갱신

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 반복적인 출처 수집/정리 작업을 줄이는 직접 프로그램을 만들고 운영 정책에 연결했다.

## Gaps

- 없음

## Improvements

- live search API를 자주 붙여야 하면 SearXNG adapter를 먼저 검토한다.

## Follow-Up Actions

- 현재 blocking follow-up은 없다.

## Rework Result

- 첫 테스트에서 `contrary=true`가 bundle coverage에 반영되지 않는 문제가 발견됐다.
- `bundle_coverage` 로직을 수정해 `source_type=contrary`와 `contrary=true`를 모두 반대 사례로 계산하게 했고, 이후 테스트가 통과했다.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-source-collector-tool.ko.md`
- Created: 2026-05-31
