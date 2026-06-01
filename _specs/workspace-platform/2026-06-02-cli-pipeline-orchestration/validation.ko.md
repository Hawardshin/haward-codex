# Validation: CLI Pipeline Orchestration

## 예정 검증

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

## 수용 기준

- pipeline template 검증 결과가 `pipeline_ready`여야 한다.
- unit tests가 중복 process id, shell metachar command, unknown pipe process, missing safety controls, evaluator target gap을 확인해야 한다.
- work mode registry가 evaluator policy와 drift 없이 통과해야 한다.
- 최종 evaluator가 `ready_to_close`여야 한다.
