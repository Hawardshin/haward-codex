# Validation Plan

## Checks To Run

- `PYTHONPATH=src python3 -m unittest tests/test_parallel_work.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `git diff --check`

## Success Criteria

- Parallel research lanes with a merge gate return `ready_to_parallelize`.
- Parallel research lanes without a merge gate produce a gap.
- A merge task that does not depend on every `wait_for` task produces a gap.
