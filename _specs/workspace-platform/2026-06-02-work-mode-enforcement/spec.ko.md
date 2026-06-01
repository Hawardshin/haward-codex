# 스펙: 작업 모드 강제화

## 목표

작업 모드를 프롬프트 안내가 아니라 설정, 검사, 기록, 평가로 강제되는 실행 계약으로 바꾼다.

## 요구사항

- `REQ-WS-055`

## 범위

- work-mode registry에 enforcement layer와 mode selection record requirement 추가
- Python CLI에 `check-work-modes`, `list-work-modes`, `show-work-mode` 추가
- work evaluator가 non-`quick` 모드의 `mode_selection_record_targets` 누락을 blocking gap으로 처리
- 정책, 워크플로, persistent instruction, 메모리 bootstrap 반영

## 비범위

- 모든 작업을 full governance로 강제하지 않는다.
- 외부 policy engine을 설치하지 않는다.

## 수용 기준

- `check-work-modes`가 registry/evaluator drift를 검사한다.
- `evaluate-work`가 mode selection record 누락을 잡는다.
- 테스트와 설정 검증이 통과한다.
