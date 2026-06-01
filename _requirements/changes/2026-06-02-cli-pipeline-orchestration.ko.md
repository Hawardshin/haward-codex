# 요구사항 변경: CLI Pipeline Orchestration

- 변경일: 2026-06-02
- 작업 모드: `governance`
- 추가 요구사항: `REQ-WS-058`
- 사용자 요청 요약: CLI를 한 번 실행하면 내부에서 여러 CLI 프로세스가 돌고, pipe 등을 이용해 여러 CLI를 실행하는 구조를 만들고 싶다고 했다.

## 변경 내용

`REQ-WS-058`을 추가해 multi-process CLI orchestration을 shell string이 아니라 검증 가능한 process graph로 관리하도록 기준선화했다.

필수 계약은 다음과 같다.

- process node: adapter, command, args, cwd, env allowlist, timeout, output bound
- pipe edge: stdout/stderr/stdin 연결
- safety control: adapter allowlist, argv, shell disabled, cwd boundary, redaction, permission, fallback, audit logging
- resource control: timeout, output limit, cancellation, cleanup, orphan process, backpressure
- source provenance, plan evidence, verification, rollback
- evaluator input: `cli_pipeline_occurred=true`, `cli_pipeline_targets`

## 영향

- `agent-platform`에 `cli-pipeline-agent`와 `check-cli-pipeline` 검증 명령이 추가된다.
- work evaluator는 CLI pipeline 작업이 있었는데 `cli_pipeline_targets`가 없으면 close-out gap으로 처리한다.
- memory bootstrap, router, workflow, prompt에서 다음 세션이 이 구조를 찾을 수 있어야 한다.
