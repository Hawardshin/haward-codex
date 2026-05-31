# 계획 기록: 출처 discovery와 한국 로컬 리뷰

## 목표

웹 검색을 더 넓고 사람처럼 수행할 수 있도록 source discovery registry와 한국 로컬 리뷰 조사 도구를 추가하고, 계획/평가에 provenance/evidence 필드를 강제한다.

## 계획 근거

- `source_value_provenance`: 사용자 지시, Naver/Kakao 공식 API 문서, 한국/세계 기술 블로그 seed, 논문 검색 원천, 기존 source collection policy
- `plan_evidence`: planner/evaluator code changes, source-discovery-registry, Korean local review tool tests, overlap audit

## 실행 단계

1. 웹 검색 기록을 남긴다.
2. source discovery registry를 만든다.
3. Korean local review tool을 만든다.
4. planner/evaluator readiness check에 provenance/evidence 필드를 추가한다.
5. 정책, 프롬프트, 워크플로, memory bootstrap, 요구사항, 스펙, 히스토리를 갱신한다.
6. 중복/겹침 audit를 작성한다.
7. 검증, 평가, 커밋, push를 수행한다.

## 변경 이력

- 2026-05-31: 최초 계획 작성.
