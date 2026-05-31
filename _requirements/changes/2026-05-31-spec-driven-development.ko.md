# 2026-05-31 요구사항 변경 기록: Spec-Driven 구조 도입

## 변경 요약

사용자는 기존 요구사항 관리 구조가 spec-driven 방식과 유사해야 한다고 지시했다. 이에 요구사항을 스펙, 계획, 작업 목록, 검증, traceability로 변환한 뒤 구현하는 계층을 추가했다.

## 변경 항목

| ID | 변경 | 영향 | 상태 |
| --- | --- | --- | --- |
| RC-2026-05-31-004 | `_specs/`를 공통 spec-driven 산출물 위치로 추가 | workspace 운영 규칙, 시작/종료 workflow, 평가 입력 | accepted |
| RC-2026-05-31-005 | `REQ-WS-013` spec-driven 운영 요구사항 추가 | 앞으로 구현 전 spec target 확인 필요 | accepted |
| RC-2026-05-31-006 | `work-evaluator-agent`에 `spec_targets` 추가 | 스펙 산출물 누락 시 blocking gap | accepted |

## 영향 평가

- 시작 단계에서 요구사항 다음에 관련 스펙을 확인하거나 만들어야 한다.
- 작업 종료 시 `spec_targets`를 평가 입력에 포함해야 한다.
- 프로젝트별 스펙은 해당 프로젝트의 `specs/`에 둔다.
