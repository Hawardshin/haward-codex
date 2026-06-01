# 누락 방지 게이트 스펙

## 배경

사용자는 에이전트가 작업 중 무엇인가를 빠뜨릴 수 있다고 지적했다. 기존 evaluator는 여러 target 누락을 잡지만, 사용자 지시와 산출물/검증을 항목별로 대조하는 전용 coverage gate는 없었다.

## 요구사항

- `REQ-WS-056`

## 목표

- non-`quick` 작업에서 `omission_check_targets`를 필수 close-out target으로 만든다.
- `omission-guard-agent`와 `check-omissions` CLI로 필수 항목 coverage를 검증한다.
- 정책, 워크플로, 프롬프트, 지속 지시, 메모리 부트스트랩, 작업 모드 registry를 갱신한다.

## 비목표

- 모든 `quick` 작업에 전체 governance loop를 강제하지 않는다.
- 내부 추론 원문을 저장하지 않는다.
- 체크리스트를 긴 서술형 회고로 만들지 않는다.

## 성공 기준

- `check-omissions`가 필수 missing, evidence 없는 covered, rationale 없는 deferred/not_applicable을 gap으로 반환한다.
- `evaluate-work`가 선택한 모드에 따라 `omission_check_targets` 누락을 gap으로 반환한다.
- `check-work-modes`, `check-memory-bootstrap`, 단위 테스트가 통과한다.
