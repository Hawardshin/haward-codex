# 요구사항 검토: CLI 어댑터 경계

## 검토 대상

- `REQ-WS-053`

## 사용자 의도 적합성

- 설치형 제품이라는 방향과 CLI 활용 가능성을 동시에 유지한다.
- 플랫폼의 정체성을 특정 CLI wrapper가 아니라 workspace/orchestration layer로 둔다.
- CLI는 능력 확장 수단으로 사용하되 결합도를 낮춘다.

## 검토 결과

- 상태: 승인
- 이유: 기존 tool-agnostic assistant runtime 원칙과 installable desktop productization 원칙을 충돌 없이 연결한다.

## 검증 기준

- CLI adapter registry가 self-documenting config contract를 통과해야 한다.
- desktop productization config가 CLI-neutral runtime strategy를 기록해야 한다.
- workflow/prompt/router/index에서 CLI adapter integration 경로를 찾을 수 있어야 한다.
