# Validation Plan

## Checks To Run

- `python3 -m json.tool` for changed JSON configs
- `PYTHONPATH=src python3 -m unittest tests/test_coding_research.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/task-board/src/task_board.py --check`
- `git diff --check`

## Success Criteria

- `complete-coding-research` returns gaps when new fields are missing.
- The template includes the new fields and passes readiness.
- Docs and JSON settings pass the self-documenting config contract.
