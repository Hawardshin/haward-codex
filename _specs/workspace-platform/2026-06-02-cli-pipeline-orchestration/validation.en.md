# Validation: CLI Pipeline Orchestration

## Planned Checks

- `cd agent-platform && python3 -m unittest discover -s tests`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline configs/integrations/cli-pipeline-template.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-adapter-registry.json configs/integrations/cli-pipeline-template.json configs/workflows/work-mode-registry.json configs/memory/bootstrap-manifest.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `cd workspace-monitor && npm run collect`
- `git diff --check`

## Acceptance

- The pipeline template check returns `pipeline_ready`.
- Unit tests cover duplicate process IDs, shell metachar commands, unknown pipe processes, missing safety controls, and evaluator target gaps.
- Work mode registry passes without evaluator policy drift.
- Final evaluator returns `ready_to_close`.
