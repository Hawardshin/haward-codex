# 요청-결과 추적: 사람형 웹 검색 강화

## 요청

웹검색을 더 잘하고, 사람이 실제로 검색하듯 더 많은 소스를 찾아내며, 좋은 출처는 요약하는 구조를 만들 것.

## 작업 모드

`governance`

## 요구사항

- `REQ-WS-041`

## 결과

- 검색 방법 profile `human-search-profile.json`을 추가했다.
- `source-discovery-registry.json`은 검색 원천, `human-search-profile.json`은 검색 방법으로 책임을 분리했다.
- source collector에 `query-plan` 명령을 추가해 반복 검색 계획을 만들 수 있게 했다.
- workflow, prompt, router, source collection policy, persistent instructions, memory bootstrap을 연결했다.
- 좋은 출처 요약은 재사용 가치와 plan impact가 있을 때만 저장하도록 규칙화했다.

## 산출물

- `agent-platform/configs/research/human-search-profile.json`
- `_ops/workflows/54-human-like-source-discovery.md`
- `_ops/prompts/84-human-like-source-discovery.md`
- `_tools/source-collector/src/source_collector.py`
- `_research/topics/agent-planning/2026-06-01-human-like-web-search.ko.md`
- `_research/topics/agent-planning/2026-06-01-human-like-web-search-query-plan.ko.md`
- `_specs/workspace-platform/2026-06-01-human-like-web-search/`

## 검증

- source collector tests
- config contract
- memory bootstrap
- workspace index/task board
- grounding/evaluation

## 평가

- 평가 파일: `_history/evaluations/2026/2026-06-01-human-like-web-search.ko.md`
- 시간 기록: `_history/work-timings/2026/2026-06-01-human-like-web-search.json`
