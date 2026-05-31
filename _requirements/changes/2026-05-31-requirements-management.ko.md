# 2026-05-31 요구사항 변경 기록: 요구사항 관리 도입

## 변경 요약

사용자 요청을 단순 작업 기록이 아니라 요구사항으로 정의하고, 계속 수정/검토하며 그 요구사항을 기반으로 구현하도록 요구사항 관리 계층을 추가했다.

## 변경 항목

| 변경 ID | 내용 | 영향 | 상태 |
| --- | --- | --- | --- |
| RC-2026-05-31-001 | `_requirements/` 폴더를 공통 요구사항 관리 위치로 추가 | workspace 운영 규칙, 시작/종료 workflow, 평가 입력 | accepted |
| RC-2026-05-31-002 | `REQ-WS-005` 요구사항 생명주기 요구사항 추가 | 앞으로 구현 전 요구사항 target 확인 필요 | accepted |
| RC-2026-05-31-003 | `work-evaluator-agent`에 `requirements_targets` 추가 | 요구사항 누락 시 blocking gap | accepted |

## 영향 분석

- 시작 단계에서 관련 요구사항 기준선을 확인해야 한다.
- 작업 종료 시 요구사항 기준선, 변경 기록, 또는 검토 기록을 평가 입력에 포함해야 한다.
- 프로젝트별 기능 요구사항이 생기면 해당 프로젝트의 `docs/requirements/`에 둔다.

## 검토 결과

- 승인 상태: accepted
- 검토 파일: `_requirements/reviews/2026-05-31-workspace-platform.ko.md`
