# Validation Plan

## Checks To Run

- `python3 -m json.tool` for changed JSON configs
- `PYTHONPATH=src python3 -m unittest tests/test_parallel_work.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `git diff --check`

## Success Criteria

- Independent batches return `ready_to_parallelize`.
- Cycles, unknown dependencies, and same-batch path overlaps are gaps.
- Template, config, memory, map, and board checks pass.
