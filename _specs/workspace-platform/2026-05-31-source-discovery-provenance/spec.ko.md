# 스펙: 출처 discovery, provenance, 한국 로컬 리뷰

## 배경

사용자는 원천값 출처와 계획 근거가 명확해야 하며, 웹 검색은 사람이 실제로 검색하듯 더 많은 좋은 소스를 찾아야 한다고 지시했다. 또한 한국 사용자 리뷰/로컬 판단에서는 Naver Map, Kakao Map, Naver Blog/Search 같은 한국 중심 채널을 우선해야 한다.

## 관련 요구사항

- `REQ-WS-017`
- `REQ-WS-018`
- `REQ-WS-019`

## 범위

- planner/evaluator 입력에 provenance/evidence 필드 추가
- 넓은 source discovery registry 추가
- 한국 로컬 리뷰 후보 점수화 도구 추가
- 중복/겹침 audit 문서 추가
- source collection, prompts, workflows, memory bootstrap 갱신

## 수용 기준

- `plan-from-research`는 `source_value_provenance`와 `plan_evidence`가 없으면 ready 상태가 아니다.
- `complete-coding-research`는 `source_value_provenance`와 `plan_evidence`가 없으면 implementation-ready가 아니다.
- `evaluate-work`는 `source_provenance_targets`와 `plan_evidence_targets`가 없으면 rework를 요구한다.
- `source-discovery-registry.json`은 config contract를 통과한다.
- `_tools/korean-local-review/`는 query plan과 후보 점수화를 테스트로 검증한다.
