# 출처 수집 도구 리서치

## 조사 목적

많은 웹 자료를 반복적으로 모으고 정리하는 일이 힘들 때 사용할 수 있는 자동화 도구 설계 근거를 정리한다.

## 접근일

- 2026-05-31

## 출처

| Source | URL | Notes |
| --- | --- | --- |
| SearXNG documentation | https://docs.searxng.org/index.html | self-hosted metasearch, 여러 검색 서비스 aggregation, API 가능성 |
| SearXNG Search API | https://docs.searxng.org/dev/search_api.html | HTTP API로 검색 결과를 가져올 수 있는 후보 |
| Tavily Search API docs | https://docs.tavily.com/documentation/api-reference/endpoint/search | 검색 결과, raw content, include/exclude domains 등 agent search API 후보 |
| SerpApi Search Index API | https://serpapi.com/search-index-api | 구조화된 검색 결과 JSON 후보 |
| OpenAI Web Search docs | https://platform.openai.com/docs/guides/tools-web-search | 검색 결과 citation과 URL annotation 참고 |

## 핵심 요약

- 실제 웹 검색 자동화는 provider 선택과 API 키, 비용, rate limit, 개인정보 노출 위험을 동반한다.
- SearXNG는 self-hosted metasearch 후보로 적합하고, Tavily/SerpApi는 hosted API 후보로 적합하다.
- OpenAI web search 결과는 citation/URL annotation을 통해 결과를 추적할 수 있다.
- 현재 저장소에는 먼저 provider 독립적인 입력/출력 형식, 출처 유형 분류, bundle coverage, 점수화, 보고서 생성을 도구화하는 것이 안전하다.

## 도출한 인사이트

- API provider를 바로 고정하지 말고, `sources` JSON schema를 먼저 고정한다.
- 수집 자체보다 반복 비용이 큰 부분은 출처 정규화, 유형별 coverage, 점수화, 보고서 생성이다.
- adoption signal과 factual evidence를 분리해서 기록해야 한다.
- 나중에 SearXNG/Tavily/SerpApi/OpenAI adapter를 붙이면 같은 schema로 흘려보낼 수 있다.

## 계획 영향

- `_tools/source-collector/`를 만든다.
- 첫 버전은 네트워크 호출 없이 JSON 입력을 받아 Markdown/JSON 보고서를 생성한다.
- CLI는 `init`, `check`, `report` 명령을 제공한다.
- 테스트는 bundle coverage, source type inference, report rendering을 검증한다.

## 신뢰도 판단

- SearXNG, Tavily, SerpApi, OpenAI는 모두 검색 자동화 후보에 대한 공식 문서가 있다.
- 실제 provider 도입 여부는 비용, privacy, API 안정성, rate limit을 다시 비교해야 한다.

## 불확실성 및 반대 신호

- public SearXNG instance 의존은 안정성과 정책 문제가 있을 수 있다.
- hosted API는 비용과 vendor lock-in이 생긴다.
- 자동 수집은 source quality 판단을 대체하지 못한다.

## 적용 가능성

- 조사/계획 작업에서 여러 출처를 모았을 때 바로 적용한다.
- 검색 API adapter가 없어도 현재 web tool 결과나 수동 조사 결과를 JSON으로 넣어 사용할 수 있다.

## 관련 작업

- `_tools/source-collector/README.ko.md`
- `_tools/source-collector/src/source_collector.py`
- `_docs/policies/source-collection-policy.ko.md`

## 다음 확인 사항

- 반복 사용 후 실제 provider adapter가 필요하면 SearXNG를 먼저 검토한다.
- provider adapter를 추가할 때는 API 키/비용/개인정보 규칙을 별도 문서로 남긴다.
