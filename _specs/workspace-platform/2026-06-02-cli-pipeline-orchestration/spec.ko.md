# Spec: CLI Pipeline Orchestration

## 요구사항

- `REQ-WS-058`

## 문제

플랫폼이 다양한 CLI를 adapter로 사용할 수 있더라도, 여러 CLI를 한 번에 실행하는 순간 단순 command 실행보다 복잡한 문제가 생긴다. shell string에 `|`, `;`, redirect를 넣으면 프로세스 경계, pipe 연결, timeout, output bound, cancellation, cleanup, merge strategy가 기록되지 않는다.

## 목표

- 여러 CLI 실행을 process graph로 표현한다.
- process node와 pipe edge를 실행 전 검증한다.
- shell string pipeline을 기본 금지하고 argv-style 실행을 기본으로 둔다.
- safety/resource/provenance/verification/rollback을 pipeline input에 포함한다.
- work evaluator가 CLI pipeline 작업의 검증 target 누락을 막는다.

## 비목표

- 실제 multi-process runner 구현
- 특정 CLI 설치 또는 글로벌 환경 변경
- shell 기능 전체 재구현
- desktop permission UI 구현

## 기능 계약

- `check-cli-pipeline <input.json>`은 pipeline input을 읽고 `pipeline_ready` 또는 `rework_required`를 반환한다.
- pipeline input은 `processes`, `pipes`, `execution_policy`, `safety_controls`, `resource_controls`, `source_provenance`, `plan_evidence`, `verification`을 포함한다.
- process는 `adapter_id`, `command`, `args`, `cwd`, `env_keys`, `timeout_seconds`, `max_output_bytes`를 포함한다.
- pipe는 `from_process`, `from_stream`, `to_process`, `to_stream`, `mode`를 포함한다.
- evaluator는 `cli_pipeline_occurred=true`인데 `cli_pipeline_targets`가 없으면 gap을 만든다.

## 수용 기준

- template pipeline이 `pipeline_ready`를 반환한다.
- 중복 process id는 `rework_required`를 반환한다.
- shell metachar가 command에 들어가면 shell disabled 상태에서 gap이 된다.
- 존재하지 않는 process를 pipe가 참조하면 gap이 된다.
- `work-evaluator-agent`는 CLI pipeline target 누락을 blocking gap으로 보고한다.
