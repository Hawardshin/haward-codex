# 2026-06-02 누락 방지 요구사항 변경

## 변경 ID

- 추가 요구사항: `REQ-WS-056`

## 출처 요청

- `UR-2026-06-02-011`: "뭔가를 빼먹을 수 있다."

## 변경 내용

에이전트가 필수 항목을 빠뜨릴 수 있다는 위험을 공통 요구사항으로 승격했다.

- `quick`이 아닌 작업은 `omission_check_targets`를 남긴다.
- 사용자 지시, 요구사항, 계획 항목, 필수 산출물, acceptance check를 coverage record로 정리한다.
- 필수 `missing`, 근거 없는 `covered`, 이유 없는 `deferred`/`not_applicable`은 close-out 전 재작업한다.
- `work-evaluator-agent`가 선택한 모드에 따라 누락 방지 target 누락을 blocking gap으로 처리한다.

## 영향

- `agent-platform`에 `omission-guard-agent`와 `check-omissions` CLI가 추가된다.
- 작업 모드 registry와 evaluator target 정책에 `omission_check_targets`가 추가된다.
- 관련 정책, 워크플로, 프롬프트, 지속 지시, 메모리 부트스트랩을 갱신한다.
