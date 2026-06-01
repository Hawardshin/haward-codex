# 요청-결과 추적: CLI Pipeline 파일/아티팩트 Handoff

## 요청

- 요청 ID: `UR-2026-06-02-014`
- 요약: CLI orchestration에서 pipe뿐 아니라 파일과 기타 handoff 방식도 포함해야 한다.

## 결과

- `REQ-WS-059` 추가
- `cli_pipeline.py`에 `PipelineArtifact`, `artifacts`, `artifact_id` 검증 추가
- `cli-pipeline-template.json`에 temp artifact handoff 예시 추가
- workflow/prompt/docs/persistent instructions/memory bootstrap 갱신

## 산출물

- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `agent-platform/tests/test_cli_pipeline.py`
- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/docs/cli-pipeline-agent.ko.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`
- `_specs/workspace-platform/2026-06-02-cli-pipeline-file-artifact-handoffs/`

## 검증

- `python3 -m unittest discover -s tests`: 142 tests OK
- `check-cli-pipeline configs/integrations/cli-pipeline-template.json`: `pipeline_ready`
- `check-config-contract`: `self_documenting`
- `check-work-modes`: `ready`
- `check-omissions`: `coverage_ready`
- `check-resources`: `resource_ready`
- `check-grounding`: `ready_to_publish`

## 평가

- `_history/evaluations/2026/2026-06-02-cli-pipeline-file-artifact-handoffs.ko.md`

## 커밋

- 예정: `feat(platform): add cli pipeline artifact handoffs`
