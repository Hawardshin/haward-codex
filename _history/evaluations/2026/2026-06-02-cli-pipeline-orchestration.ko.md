# 작업 평가: CLI Pipeline Orchestration

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 평가 결과: `ready_to_close`
- 요구사항: `REQ-WS-058`

## 초기 지시

사용자는 CLI를 실행하면 내부에서 여러 프로세스가 돌고, 여러 CLI를 pipe 등으로 연결해 실행하는 구조를 만들라고 요청했다.

## 완료 결과

- `cli-pipeline-agent`와 `check-cli-pipeline` CLI를 추가했다.
- 여러 CLI를 shell string이 아니라 process node와 pipe edge를 가진 process graph로 모델링하게 했다.
- `cli-pipeline-template.json`에 execution policy, safety controls, resource controls, merge strategy, source provenance, plan evidence, verification, rollback을 포함했다.
- `work-evaluator-agent`에 `cli_pipeline_occurred=true`일 때 `cli_pipeline_targets`가 없으면 close-out gap이 생기는 조건부 gate를 추가했다.
- workflow/prompt/router/index/persistent instructions/memory bootstrap을 갱신했다.

## 검증

- `python3 -m unittest discover -s tests`: 138 tests OK
- `check-cli-pipeline configs/integrations/cli-pipeline-template.json`: `pipeline_ready`
- `check-work-modes configs/workflows/work-mode-registry.json`: `ready`
- `check-config-contract` 핵심 설정: `self_documenting`
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-omissions`: `coverage_ready`
- `check-resources`: `resource_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## 확인한 근거

- Python subprocess 공식 문서
- Node.js child_process 공식 문서
- Bash pipeline 공식 문서
- OWASP OS Command Injection Defense Cheat Sheet
- 기존 `cli-adapter-registry.json`, `REQ-WS-053`, resource leak gate

## 남은 개선 후보

실제 multi-process runner는 이번 범위에서 제외했다. 다음 단계에서 구현하려면 runtime 선택, prototype measurement, OS별 permission, process group cleanup 검증을 별도 spec으로 다뤄야 한다.
