# Plan: CLI Pipeline Orchestration

## 작업 모드

- `governance`
- 이유: 플랫폼 실행 계약, evaluator, memory anchor, workflow/prompt가 바뀐다.

## 근거

- Python `subprocess` 공식 문서는 프로세스를 생성하고 stdin/stdout/stderr pipe와 timeout을 다루는 표준 라이브러리다.
- Node.js `child_process` 공식 문서는 process stream과 spawn 계열 실행을 설명한다.
- Bash manual은 pipeline이 여러 command의 stdout/stdin 연결이라는 것을 설명하므로, 플랫폼에서는 이 의미를 shell string이 아니라 명시 그래프로 보존한다.
- OWASP command injection guidance는 명령 실행에서 allowlist와 argument handling이 중요하다는 보안 근거로 사용한다.
- 기존 `REQ-WS-053`은 CLI adapter boundary를 이미 요구한다. 이번 작업은 여러 adapter를 연결하는 상위 graph gate다.

## 구현 순서

1. `CliPipelineInput`, `PipelineProcess`, `PipelinePipe` 모델과 `check_cli_pipeline` 검증 함수를 추가한다.
2. CLI에 `check-cli-pipeline` 명령을 추가한다.
3. pipeline template와 `cli-pipeline-agent` 설정/문서를 추가한다.
4. `work-evaluator-agent`에 `cli_pipeline_occurred`, `cli_pipeline_targets` 조건부 gap을 추가한다.
5. work mode registry에 `cli_pipeline_record` enforcement layer를 추가한다.
6. CLI adapter 정책, workflow, prompt, router, index, persistent instructions, memory bootstrap을 갱신한다.
7. 요구사항, 히스토리, 평가, 타이밍, 맵을 갱신한다.
8. unit tests, config checks, work-mode checks, memory bootstrap, evaluator를 실행한다.

## 설계 선택

- 실제 실행기는 만들지 않는다. 먼저 실행 계획을 정형화하고 검증한다.
- shell은 기본 비활성화한다. pipe는 `pipes` 배열로 표현한다.
- process 단위 timeout/output bound와 pipeline 단위 cleanup/cancellation/backpressure를 분리한다.
- pipeline 작업은 resource-risk 작업과 겹칠 수 있으므로 `resource_check_targets`와 별개로 `cli_pipeline_targets`를 둔다.
