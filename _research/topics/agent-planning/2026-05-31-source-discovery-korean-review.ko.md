# 리서치 노트: 출처 discovery와 한국 로컬 리뷰

## 요약

웹 검색 품질을 높이려면 일반 검색 결과만 보는 것이 아니라, 목적별 source origin을 먼저 고르고 결과 페이지를 품질 평가해야 한다. 한국 사용자 리뷰/로컬 판단은 Naver Map, Kakao Map, Naver Blog/Search, 공식 페이지를 우선하고, 지도/블로그 리뷰는 사용자 경험 신호로 다룬다.

## 반영한 구조

- `agent-platform/configs/research/source-discovery-registry.json`
- `_research/source-lists/korean-local-review-sources.ko.md`
- `_tools/korean-local-review/`
- `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets`
- `_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md`

## 재사용 규칙

- 기술 의사결정: 공식 문서, 논문, 세계 기술 블로그, 오픈소스, community/contrary 순서로 확인한다.
- 한국 사용자를 위한 리뷰/로컬 조사: 공식 페이지, Naver Map, Naver Blog/Search, Kakao Map, 한국 커뮤니티/뉴스 순서로 확인한다.
- 논문 근거: Semantic Scholar, OpenAlex, arXiv, Papers with Code, 관련 논문 검색을 조합한다.
