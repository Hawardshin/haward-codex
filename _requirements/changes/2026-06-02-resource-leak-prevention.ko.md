# 2026-06-02 리소스 누수 방지 요구사항 변경

## 사용자 요청

- "메모리 릭을 주의해야한다 이런 플랫폼은"

## 요구사항 변경

- `REQ-WS-057` 추가.
- 플랫폼은 메모리 누수와 런타임 리소스 누수를 신뢰성 위험으로 취급한다.
- 장시간 실행 에이전트, 서버, 브라우저 자동화, subprocess, worker, queue, cache, stream, 대용량 처리, 파일 핸들, 네트워크 연결, timer, subscription을 건드리면 `resource_risk_occurred=true`를 평가 입력에 표시한다.
- 해당 작업은 resource risk, lifecycle cleanup path, measurement evidence 또는 accepted-risk rationale을 담은 `resource_check_targets`를 남긴다.

## 구현 영향

- `resource-guard-agent`와 `check-resources` CLI를 추가한다.
- `work-evaluator-agent`는 `resource_risk_occurred=true`인데 `resource_check_targets`가 없으면 close-out을 막는다.
- 작업 모드 registry와 운영 workflow/prompt는 resource leak check를 조건부 gate로 연결한다.
- memory bootstrap과 persistent instructions에 durable rule을 추가한다.

## 검증 기준

- `agent-platform` 단위 테스트 통과.
- `check-resources` template 및 실제 작업 check 통과.
- `evaluate-work`가 resource risk target 누락을 blocking gap으로 처리하는 테스트 통과.
- `check-work-modes`, memory bootstrap, docs audit, config contract 통과.
