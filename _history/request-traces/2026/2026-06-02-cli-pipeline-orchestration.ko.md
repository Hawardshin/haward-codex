# 요청-결과 추적: CLI Pipeline Orchestration

- 요청 ID: `UR-2026-06-02-013`
- 요구사항: `REQ-WS-058`
- 작업 모드: `governance`

## 요청

사용자는 하나의 CLI 동작이 내부에서 여러 프로세스를 실행하고, pipe 등을 이용해 여러 CLI를 연결하는 구조를 만들라고 요청했다.

## 결과

- `cli-pipeline-agent`와 `check-cli-pipeline` 검증 명령을 추가했다.
- process node, pipe edge, execution policy, safety control, resource control, merge strategy, provenance, verification, rollback을 포함하는 template를 추가했다.
- evaluator에 `cli_pipeline_occurred=true`일 때 `cli_pipeline_targets`가 없으면 close-out gap이 생기도록 했다.
- 운영 workflow/prompt/router/index/memory bootstrap에 탐색 경로를 연결했다.

## 주요 산출물

- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/configs/agents/cli-pipeline-agent.json`
- `agent-platform/docs/cli-pipeline-agent.ko.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`
- `_specs/workspace-platform/2026-06-02-cli-pipeline-orchestration/`
- `_history/evaluations/2026/2026-06-02-cli-pipeline-orchestration.ko.md`

## 검증

- `python3 -m unittest discover -s tests`
- `check-cli-pipeline configs/integrations/cli-pipeline-template.json`
- `check-work-modes configs/workflows/work-mode-registry.json`
- `check-config-contract`
- `check-memory-bootstrap`
- docs/naming/structure audit
- `evaluate-work`

## 커밋

- 예정: `feat(platform): add cli pipeline orchestration`
