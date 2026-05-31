# 웹 우선 작업 정책

## 목적

앞으로 이 저장소에서 처리하는 모든 새 사용자 지시는 웹 검색을 먼저 수행한 뒤 계획, 파일 탐색, 구현, 평가로 들어간다.

이 정책은 기존의 "중요한 계획이나 외부 사실이 필요한 경우 검색" 규칙보다 강한 사용자 지시다. 단순 로컬 작업이라도 먼저 가벼운 웹 검색으로 현재성, 관련 공식 문서, 좋은 레퍼런스, 반대 신호가 있는지 확인한다.

## 기본 규칙

- 새 사용자 지시를 받으면 먼저 웹 검색을 수행한다.
- 웹 검색 후 저장소 검색, 공식 문서, 프로젝트 README, 히스토리, 코드 확인으로 들어간다.
- 검색 결과가 작업과 무관하면 "관련 웹 근거 없음"을 기록하고 로컬 근거로 진행한다.
- 검색 결과가 유용하면 `_research/`에 재사용 가치가 있는 내용만 저장한다.
- 조사나 계획에 영향을 주는 작업은 [_docs/source-collection-policy.ko.md](source-collection-policy.ko.md)에 따라 공식 자료, 논문, 외국 기술 블로그, 오픈소스, 조사 아티클, 커뮤니티/소셜 신호를 폭넓게 모은다.
- 최신 정보, 외부 사실, 제품/라이브러리/법/가격/스케줄/정책은 검색 결과를 반드시 출처와 함께 확인한다.
- 검색 결과 제목만 보고 근거로 사용하지 않는다. 필요한 경우 원문을 열어 확인한다.
- 웹 검색이 실패하면 실패 이유를 기록하고, 작업이 안전하게 가능한 경우 로컬 검증을 강화한다.

## 작업 시작 순서

1. 사용자 지시를 한 문장으로 요약한다.
2. 관련 키워드로 웹 검색을 먼저 수행한다.
3. 공식 문서, 주요 레퍼런스, 최신성 신호, 반대 신호를 확인한다.
4. 검색 결과가 계획에 영향을 주는지 판단한다.
5. 저장소 상태와 프로젝트 경계를 확인한다.
6. 필요한 경우 `research-insight-planner-agent`로 검색 결과를 인사이트와 계획으로 구조화한다.
7. 구현 또는 문서 작업을 수행한다.
8. 최종 산출물의 사실 주장을 `hallucination-guard-agent`로 검증한다.
9. 평가 보고서에 검색/레퍼런스/grounding 결과를 남긴다.

## 검색 강도

| 작업 유형 | 최소 검색 |
| --- | --- |
| 단순 로컬 작업 | 가벼운 웹 검색 1회, 무관하면 로컬 검증 중심 |
| 문서/정책/운영 규칙 | 웹 검색 + 저장소 검색 + 관련 공식/강한 레퍼런스 |
| 코드/라이브러리/오픈소스 | 웹 검색 + 공식 문서/패키지/저장소 확인 |
| 최신 정보/외부 사실 | 웹 검색 + 원문 확인 + 확인 날짜 기록 |
| 고위험 판단 | 웹 검색 + 독립 출처 2개 이상 + grounding/evaluation |

## 예외 처리

- 사용자가 명시적으로 웹 검색을 금지하면 그 최신 지시를 따르되, 평가 보고서에 검색하지 않았음을 기록한다.
- 네트워크나 도구가 실패하면 실패를 기록하고 가능한 로컬 검증을 수행한다.
- 보안상 외부로 보내면 안 되는 민감 정보는 그대로 검색어에 넣지 않는다. 일반화된 검색어로 검색한다.

## 관련 파일

- [_ops/workflows/05-web-first-intake.md](../_ops/workflows/05-web-first-intake.md)
- [_ops/prompts/05-web-first-intake.md](../_ops/prompts/05-web-first-intake.md)
- [_docs/source-collection-policy.ko.md](source-collection-policy.ko.md)
- [_docs/search-insight-planning-policy.ko.md](search-insight-planning-policy.ko.md)
- [_docs/hallucination-prevention-policy.ko.md](hallucination-prevention-policy.ko.md)
- [_research/topics/agent-planning/2026-05-31-web-first-work-policy.ko.md](../_research/topics/agent-planning/2026-05-31-web-first-work-policy.ko.md)
