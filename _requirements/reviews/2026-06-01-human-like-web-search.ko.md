# 요구사항 검토: 사람형 웹 검색 강화

## 검토 결과

- 상태: 승인
- 요구사항: `REQ-WS-041`
- 작업 모드: `governance`

## 근거

- 기존 `REQ-WS-018`은 넓은 검색 원천을 관리하지만, 검색 방법 자체인 query ladder/operator/snowballing/요약 gate는 충분히 명시하지 않았다.
- 기존 `_tools/source-collector/`는 source bundle scoring은 가능했지만 검색 계획 생성 명령은 없었다.
- 이번 변경은 검색 원천 registry와 검색 방법 profile을 분리해 중복을 줄인다.

## 검증 기준

- `human-search-profile.json`이 self-documenting config contract를 통과해야 한다.
- source collector query-plan 기능이 단위 테스트를 통과해야 한다.
- web-first workflow, prompt router, memory bootstrap에서 새 검색 profile을 찾을 수 있어야 한다.
