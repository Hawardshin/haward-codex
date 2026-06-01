# 계획 기록: 마케팅/설문/정량 근거 조사

## 목표

마케터 자료조사, 이론적인 책 근거, 실제 설문조사, 정량 수치 근거를 폭넓게 찾고, 출처와 수치 맥락을 보존하는 조사 구조를 만든다.

## 작업 모드

- `governance`

## 근거 요약

- AAPOR와 ESOMAR는 설문 방법론과 온라인 sample quality를 평가하는 기준으로 적합하다.
- Pew와 Gallup은 공개 survey methodology의 좋은 예시다.
- World Bank, OECD, FRED, Census, KOSIS, ECOS는 시장 규모 계산의 공식 통계/분모 출처로 적합하다.
- CMO Survey, DataReportal, HubSpot, Salesforce, NielsenIQ, Kantar는 current market context와 benchmark를 찾는 출발점이지만 sponsor와 methodology 확인이 필요하다.
- Google Books, Open Library, Crossref는 책/논문 discovery에 유용하지만 metadata가 원문 내용을 대신하지 않는다.

## 결정

- 새 설정 파일 `agent-platform/configs/research/marketing-evidence-profile.json`을 둔다.
- `source-registry.json`에 marketing evidence에 필요한 source type을 추가한다.
- `source-discovery-registry.json`에는 search origin과 추천 순서만 두고, 실제 claim은 exact source를 다시 열어 검증한다.
- memory bootstrap에 marketing evidence profile을 required warm anchor로 추가한다.
- 숫자 근거는 `quantitative_evidence_fields`로 저장하도록 운영 규칙에 반영한다.

## 산출물

- `agent-platform/configs/research/marketing-evidence-profile.json`
- `_research/source-lists/marketing-evidence-sources.ko.md`
- `_requirements/changes/2026-06-01-marketing-evidence-research.ko.md`
- `_specs/workspace-platform/2026-06-01-marketing-evidence-research/`
- `_history/web-searches/2026/2026-06-01-marketing-evidence-research.ko.md`

## 검증 계획

- JSON syntax와 config contract를 검증한다.
- memory bootstrap readiness를 검증한다.
- workspace monitor snapshot과 operations maps를 재생성한다.
- grounding과 work evaluation으로 초기 지시와 결과의 gap을 확인한다.
