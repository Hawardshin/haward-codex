# 리소스 누수 방지 Spec

## 배경

플랫폼은 에이전트, 브라우저 검증, 모니터링 UI, 외부 CLI adapter, 병렬 작업을 계속 추가한다. 이런 구조에서는 메모리 누수와 리소스 누수가 누적되면 작업 시간이 늘고, 검증 결과가 불안정해지고, 설치형 제품화 단계에서 신뢰성 문제가 된다.

## 요구사항

- `REQ-WS-057`

## 목표

- 메모리/리소스 누수 위험이 있는 작업을 감지할 수 있는 조건부 close-out gate를 만든다.
- 리소스 위험, 생명주기 cleanup path, 측정 근거 또는 수용 rationale을 구조화한다.
- `work-evaluator-agent`가 resource-risk 작업의 누락된 resource check를 blocking gap으로 처리한다.
- 운영 문서, 프롬프트, 메모리 부트스트랩에서 다음 세션이 이 규칙을 찾을 수 있게 한다.

## 비목표

- 모든 작업에 메모리 profiling을 강제하지 않는다.
- 실제 runtime profiler나 daemon 관측 시스템을 이번 작업에서 만들지 않는다.
- 기존 프로젝트의 모든 과거 리소스 위험을 소급 감사하지 않는다.

## 범위

- `agent-platform/src/agent_platform/evaluation/resource_guard.py`
- `check-resources` CLI
- `work-evaluator-agent`의 conditional resource target
- resource guard template, agent config, docs
- workspace-level policy, workflow, prompt, persistent instruction, memory anchor

## 수락 기준

- resource guard는 필수 unresolved risk, 근거 없는 mitigation, cleanup path 누락, measurement not_run을 gap으로 보고한다.
- evaluator는 `resource_risk_occurred=true`인데 `resource_check_targets`가 없으면 gap으로 보고한다.
- 작업 모드 registry는 resource leak record enforcement layer를 포함한다.
- docs/prompt/workflow/index/memory bootstrap에서 resource leak prevention을 찾을 수 있다.
- 단위 테스트와 governance checks가 통과한다.
