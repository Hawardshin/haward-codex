# 요구사항 변경: 대기업/고신뢰 출처 registry

## 변경 요약

- 추가 요구사항: `REQ-WS-016`
- 출처 요청: `UR-2026-05-31-040`
- 변경 이유: 사용자가 대기업과 높은 수준의 사이트 목록은 일반 출처와 별도로 관리하라고 지시했다.

## 변경 내용

대기업 엔지니어링 블로그, 공식 연구소, architecture center, 고신뢰 독립 출처 목록은 `agent-platform/configs/research/enterprise-source-registry.json`에서 별도로 관리한다. 사람이 빠르게 볼 수 있는 요약은 `_research/source-lists/`에 둔다.

## 영향

- 리서치와 코딩 조사에서 고신뢰 출처 seed를 빠르게 확인할 수 있다.
- 일반 source taxonomy와 curated site list가 분리되어 설정의 목적이 명확해진다.
- 특정 claim을 쓸 때는 여전히 원문 페이지를 다시 확인해야 한다.
