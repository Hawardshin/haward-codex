# CLI Pipeline Agent

## 목적

`cli-pipeline-agent`는 하나의 작업 안에서 여러 CLI 프로세스를 실행하고 stdout/stderr/stdin을 연결하거나, 병렬로 실행한 결과를 합치는 구조를 실행 전에 검증한다.

이 에이전트는 실제 명령 실행기가 아니다. 먼저 실행 계획을 검증 가능한 process graph로 만들고, shell string에 숨은 pipe 대신 명시적인 `processes`와 `pipes`를 남기게 한다.

## 언제 쓰나

- 하나의 사용자 동작이 여러 CLI를 실행해야 할 때
- CLI A의 stdout을 CLI B의 stdin으로 넘겨야 할 때
- 조사 fan-out 결과를 fan-in merge gate에서 합쳐야 할 때
- desktop shell, monitor, local daemon, agent workflow가 외부 CLI 여러 개를 실행하려 할 때
- pipeline 작업을 닫기 전 `work-evaluator-agent` 입력에 `cli_pipeline_occurred=true`를 넣어야 할 때

## 입력

기본 형식은 `agent-platform/configs/integrations/cli-pipeline-template.json`을 사용한다.

- `processes`: 각 CLI 프로세스 노드
- `pipes`: stdout/stderr/stdin 연결 그래프
- `execution_policy`: shell 사용 여부, argv 실행, adapter allowlist, explicit cwd 규칙
- `safety_controls`: allowlist, secret redaction, permission scope, audit logging 등 필수 통제
- `resource_controls`: timeout, output bound, cancellation, cleanup, orphan process, backpressure 규칙
- `source_provenance`: 명령 실행 가정과 설계 출처
- `plan_evidence`: 왜 이 pipeline 구조가 필요한지에 대한 근거
- `verification`: dry-run, contract check, smoke test 결과

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline configs/integrations/cli-pipeline-template.json
```

실제 작업에서는 템플릿을 그대로 쓰지 말고 `_history/evaluations/YYYY/` 또는 프로젝트별 history 위치에 작업 전용 JSON을 저장한다.

## 판정

- `pipeline_ready`: blocking gap 없이 실행 계획을 검토할 수 있다.
- `rework_required`: process graph, pipe, allowlist, timeout, output bound, cleanup, provenance, verification 중 필수 항목이 부족하다.

`work-evaluator-agent`는 `cli_pipeline_occurred=true`인데 `cli_pipeline_targets`가 없으면 close-out을 막는다.
