# Validation Plan

## Required Checks

- `cd agent-platform && python3 -m unittest discover -s tests`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline configs/integrations/cli-pipeline-template.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-pipeline-template.json configs/integrations/cli-adapter-registry.json configs/workflows/work-mode-registry.json configs/memory/bootstrap-manifest.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-cli-pipeline-file-artifact-handoffs.json`

## Acceptance Criteria

- The template with artifact handoff returns `pipeline_ready`.
- Unsafe path, missing artifact id, and unknown producer tests require rework.
- Evaluation input includes `cli_pipeline_occurred=true`, `resource_risk_occurred=true`, `omission_check_targets`, and `mode_selection_record_targets`.
