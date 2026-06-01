# Request Trace: CLI Pipeline Orchestration

- Request ID: `UR-2026-06-02-013`
- Requirement: `REQ-WS-058`
- Work mode: `governance`

## Request

The user asked for a structure where one CLI action runs several internal processes and connects multiple CLIs through pipes or similar mechanisms.

## Result

- Added `cli-pipeline-agent` and the `check-cli-pipeline` validation command.
- Added a template covering process nodes, pipe edges, execution policy, safety controls, resource controls, merge strategy, provenance, verification, and rollback.
- Added evaluator behavior so `cli_pipeline_occurred=true` without `cli_pipeline_targets` becomes a close-out gap.
- Connected the structure into workflow/prompt/router/index/memory bootstrap navigation.

## Key Artifacts

- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/configs/agents/cli-pipeline-agent.json`
- `agent-platform/docs/cli-pipeline-agent.en.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`
- `_specs/workspace-platform/2026-06-02-cli-pipeline-orchestration/`
- `_history/evaluations/2026/2026-06-02-cli-pipeline-orchestration.en.md`

## Verification

- `python3 -m unittest discover -s tests`
- `check-cli-pipeline configs/integrations/cli-pipeline-template.json`
- `check-work-modes configs/workflows/work-mode-registry.json`
- `check-config-contract`
- `check-memory-bootstrap`
- docs/naming/structure audit
- `evaluate-work`

## Commit

- Planned: `feat(platform): add cli pipeline orchestration`
