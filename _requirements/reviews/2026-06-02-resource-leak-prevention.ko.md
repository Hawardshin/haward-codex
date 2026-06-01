# 리소스 누수 방지 요구사항 검토

## 검토 대상

- 요구사항: `REQ-WS-057`
- 요청: 플랫폼은 메모리 누수에 주의해야 한다는 지속 지시
- 작업 모드: `governance`

## 검토 결과

| 기준 | 결과 | 메모 |
| --- | --- | --- |
| 사용자 의도 반영 | 통과 | 단순 주의 문구가 아니라 조건부 close-out gate로 반영했다. |
| 플랫폼 범위 적합성 | 통과 | 장시간 에이전트, 브라우저 검증, UI/서버/CLI adapter가 늘어나는 구조에 맞다. |
| 강제 가능성 | 통과 | `resource_risk_occurred=true`와 `resource_check_targets` 누락을 evaluator가 blocking gap으로 처리한다. |
| 과잉 프로세스 방지 | 통과 | 모든 작업에 강제하지 않고 리소스 위험이 있을 때만 적용한다. |
| 검증 가능성 | 통과 | `check-resources`, 단위 테스트, work evaluator, memory bootstrap, docs/config 검증으로 확인한다. |

## 결정

`REQ-WS-057`은 공통 workspace/platform 요구사항 기준선에 추가한다.
