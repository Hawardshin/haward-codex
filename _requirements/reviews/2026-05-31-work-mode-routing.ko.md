# 2026-05-31 작업 모드 라우팅 요구사항 검토

## 검토 대상

- `REQ-WS-020`
- `_requirements/changes/2026-05-31-work-mode-routing.ko.md`
- `agent-platform/configs/workflows/work-mode-registry.json`

## 검토 결과

- 상태: accepted
- 이유: 기존 풀 루프는 안전하지만 작은 작업과 긴급 작업에 과도한 마찰을 만든다. 모드 기반 분기는 사용자의 효율 요구를 충족하면서 `standard`/`governance`의 기존 엄격함을 보존한다.

## 수용 기준

- 작업 시작 시 모드를 선택할 수 있다.
- evaluator가 모드별 blocking target을 다르게 판정한다.
- `ship_first`에서 미룬 개선은 백로그 target으로 남는다.
- 기존 기본 모드는 `standard`라 기존 엄격한 close-out 테스트가 유지된다.

## 남은 관찰

- 실제 몇 차례 작업에서 `quick`과 `ship_first`가 너무 느슨하거나 엄격한지 관찰한 뒤 `_ops/backlog/deferred-improvements.ko.md`의 개선 항목을 닫거나 조정한다.
