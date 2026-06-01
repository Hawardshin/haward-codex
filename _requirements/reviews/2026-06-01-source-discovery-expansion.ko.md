# 요구사항 검토: 원천 데이터 조사 소스 확장

## 검토 대상

- `REQ-WS-003`
- `REQ-WS-016`
- `REQ-WS-017`
- `REQ-WS-018`

## 검토 결과

기존 요구사항이 사용자의 최신 요청을 이미 포괄한다. 이번 작업은 새 요구사항 추가가 아니라 `REQ-WS-018`의 concrete source coverage를 확장하는 변경으로 처리한다.

## 반영 사항

- `source-discovery-registry.json`에 글로벌, 한국, 인도, 인도 개인/전문가, 논문 탐색 source origin을 추가했다.
- `enterprise-source-registry.json`에 공통 재사용성이 큰 글로벌 engineering source를 보강했다.
- 개인/커뮤니티/adoption signal은 primary proof가 아님을 설정과 문서에 명시했다.
- 논문 source는 graph, publisher/venue, preprint, code/adoption signal의 역할을 분리했다.

## 검토 판단

- 요구사항 변경 필요: 없음
- 후속 개선: 실제 조사 task에서 이 source set을 사용한 뒤 stale/low-signal source를 제거하거나 재분류한다.
