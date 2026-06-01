# 계획: 사람형 웹 검색 강화

## 작업 모드

`governance`

## 계획 근거

- 사용자 요청: 웹 검색을 더 잘하고, 사람이 실제로 검색하듯 더 많은 소스를 찾고, 좋은 출처를 요약할 것.
- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-human-like-web-search.ko.md`
- 기존 구조: `source-discovery-registry.json`은 검색 원천, `_tools/source-collector/`는 출처 묶음 정규화에 강점이 있음.

## 실행 계획

1. 검색 방법 레퍼런스를 확인한다.
2. 검색 원천과 검색 방법의 책임을 분리한다.
3. `human-search-profile.json`을 추가한다.
4. source collector에 `query-plan` 명령을 추가한다.
5. workflow, prompt, router, policy, persistent instruction, memory bootstrap을 연결한다.
6. 요구사항/스펙/히스토리/평가를 갱신한다.
7. 검증 후 커밋/푸시한다.

## Plan Evidence

- Query operators: Google Search Help/Search Central.
- Search reporting: Cochrane Handbook, PRISMA-S.
- Snowballing: Wohlin paper.
- Source triage: SIFT/lateral reading.
- Local implementation fit: existing `source-discovery-registry.json`, `_tools/source-collector/`.
