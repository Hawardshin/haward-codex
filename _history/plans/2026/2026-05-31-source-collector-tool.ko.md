# 출처 수집 도구 계획

## 초기 요청

- "이걸 계속 반복하는게 힘들다면 자료를 최대한 많이 모을 수 있게 직접 프로그램을 만드는 것도 방법이야."

## 계획 목적

- 반복적인 출처 수집/정리 작업을 줄이는 Python 도구를 만든다.
- 첫 버전은 검색 API provider를 고정하지 않고, 조사 결과 JSON을 받아 정규화/점수화/보고서 생성을 수행한다.

## 검색 질문

- 많은 자료를 자동으로 모으는 데 사용할 수 있는 검색 API나 오픈소스 도구는 무엇인가?
- provider를 바로 붙이는 것과 provider 독립 schema를 먼저 만드는 것 중 어떤 접근이 안전한가?
- 기존 source collection policy와 어떻게 연결할 것인가?

## 검색 채널

- 웹 검색
- 공식 문서 확인
- 저장소 내부 도구 구조 확인

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| SearXNG docs | https://docs.searxng.org/index.html | self-hosted metasearch 후보 |
| SearXNG Search API | https://docs.searxng.org/dev/search_api.html | HTTP API 후보 |
| Tavily Search API | https://docs.tavily.com/documentation/api-reference/endpoint/search | hosted search API 후보 |
| SerpApi Search Index API | https://serpapi.com/search-index-api | JSON search result 후보 |
| OpenAI Web Search docs | https://platform.openai.com/docs/guides/tools-web-search | citations/URL annotations 참고 |
| 기존 도구 구조 | `_tools/workspace-index/`, `_tools/task-board/` | Python 표준 라이브러리 기반 CLI 패턴 |

## 지식 베이스 검증

- 내부 운영 문서를 근거로 사용하므로 `knowledge-skeptic-agent`로 검증한다.
- 검증 대상: `_docs/policies/source-collection-policy.ko.md`, `_tools/README.md`, `_ops/workflows/05-web-first-intake.md`, `_ops/workflows/55-research-insight-planning.md`
- 기대 결과: `ready_to_reference`

## 도출한 인사이트

- 검색 provider를 바로 고정하면 API 키, 비용, privacy, rate limit 이슈가 생긴다.
- 먼저 JSON schema와 deterministic report generator를 만들면 현재 web tool 결과도 정리할 수 있고, 나중에 provider adapter도 붙이기 쉽다.
- 출처 수집 반복에서 가장 큰 비용은 검색 자체보다 출처 유형 분류, coverage 체크, 점수화, 보고서 작성이다.

## 계획 단계

1. `_tools/source-collector/` 폴더를 만든다.
2. `source_collector.py`에 `init`, `check`, `report` 명령을 구현한다.
3. 출처 유형, bundle coverage, quality score, adoption signal score를 계산한다.
4. README 한국어/영어 문서와 예제 JSON을 추가한다.
5. unit test를 추가한다.
6. source collection policy와 workflow에서 도구를 링크한다.
7. 리서치 노트, 히스토리, 평가 보고서를 저장한다.
8. 검증 후 커밋하고 push한다.

## 제외하거나 보류한 선택지

- 첫 버전에서 실제 웹 검색 API 호출은 보류한다.
- SearXNG/Tavily/SerpApi/OpenAI adapter는 provider 선택과 credential 정책이 정해진 뒤 추가한다.

## 위험과 불확실성

- JSON 입력을 수동으로 채워야 하므로 완전 자동화는 아니다.
- 점수는 의사결정 보조 지표이며 사실성 보장은 아니다.
- adoption signal은 편향될 수 있으므로 별도 점수로 분리한다.

## 검증 방법

- `python3 -m unittest discover -s _tools/source-collector/tests`
- `python3 _tools/source-collector/src/source_collector.py init ...`
- `python3 _tools/source-collector/src/source_collector.py check ...`
- `python3 _tools/source-collector/src/source_collector.py report ...`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | provider adapter를 보류하고 local normalizer/report tool부터 구현 | API 키/비용/개인정보 결정을 미루면서도 반복 작업을 줄이기 위함 |
