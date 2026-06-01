# Request Trace: CLI Pipeline File/Artifact Handoff

## Request

- Request ID: `UR-2026-06-02-014`
- Summary: CLI orchestration should include files and other handoff methods, not only pipes.

## Result

- Added `REQ-WS-059`.
- Added `PipelineArtifact`, `artifacts`, and `artifact_id` validation to `cli_pipeline.py`.
- Added a temp artifact handoff example to `cli-pipeline-template.json`.
- Updated workflow, prompt, docs, persistent instructions, and memory bootstrap.

## Artifacts

- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `agent-platform/tests/test_cli_pipeline.py`
- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/docs/cli-pipeline-agent.en.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`
- `_specs/workspace-platform/2026-06-02-cli-pipeline-file-artifact-handoffs/`

## Verification

- `python3 -m unittest discover -s tests`: 142 tests OK
- `check-cli-pipeline configs/integrations/cli-pipeline-template.json`: `pipeline_ready`
- `check-config-contract`: `self_documenting`
- `check-work-modes`: `ready`
- `check-omissions`: `coverage_ready`
- `check-resources`: `resource_ready`
- `check-grounding`: `ready_to_publish`

## Evaluation

- `_history/evaluations/2026/2026-06-02-cli-pipeline-file-artifact-handoffs.en.md`

## Commit

- Planned: `feat(platform): add cli pipeline artifact handoffs`
