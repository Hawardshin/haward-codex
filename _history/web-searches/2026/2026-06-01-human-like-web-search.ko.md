# 웹 검색 기록: 사람형 웹 검색 강화

## 사용자 지시 요약

웹검색을 사람이 실제로 검색하듯 더 많은 소스를 찾아내고, 좋은 것은 요약하는 방향으로 강화하라는 요청.

## 검색 시각

- 2026-06-01

## 검색어

- `best practices web search strategy query expansion source discovery snowballing research workflow`
- `systematic literature search snowballing backward forward citation chaining best practices`
- `OSINT search techniques source evaluation query operators site search best practices`
- `AI research agent search strategy source ranking synthesis citation grounding best practices`
- `PRISMA-S extension search strategy reporting checklist`
- `Wohlin guidelines for snowballing in systematic literature studies software engineering`
- `Google Search help search operators exact match site filetype OR after before`
- `SIFT lateral reading source evaluation`

## 확인한 출처

| 출처 | 유형 | 반영 |
| --- | --- | --- |
| https://support.google.com/websearch/answer/2466433 | official | exact phrase, exclusion, site-like refinement |
| https://developers.google.com/search/docs/monitor-debug/search-operators | official | operator search 목적/한계 |
| https://training.cochrane.org/handbook/current/chapter-04 | standard | 다중 원천 검색과 기록 |
| https://www.prisma-statement.org/prisma-s/ | standard | search strategy reporting |
| https://www.wohlin.eu/ease14.pdf | paper | backward/forward snowballing |
| https://hapgood.us/2019/06/19/sift-the-four-moves/ | analysis | lateral reading/source triage |

## 제외한 약한 출처

- 검색 팁을 광고/SEO 유입 목적으로만 설명하는 일반 블로그.
- 출처 평가나 검색 기록 기준 없이 “검색 명령어 모음”만 나열한 페이지.
- 방법론이나 원천 링크 없이 AI 검색을 홍보하는 마케팅 페이지.

## 계획에 반영한 인사이트

- 검색 원천 목록과 검색 방법을 분리한다.
- 검색 방법은 query ladder와 snowballing을 가진 `human-search-profile.json`으로 관리한다.
- 반복 실행은 `_tools/source-collector/`의 `query-plan` 명령으로 자동화한다.
- 좋은 출처 요약은 선택적으로 하며, 재사용 가치와 plan impact가 있을 때 저장한다.

## 공개 판단 요약

이번 변경은 단순히 더 많은 출처 목록을 추가하는 것이 아니라, 어떻게 더 잘 찾고 어떻게 좋은 출처만 남길지에 대한 절차를 플랫폼 규칙으로 승격한다.
