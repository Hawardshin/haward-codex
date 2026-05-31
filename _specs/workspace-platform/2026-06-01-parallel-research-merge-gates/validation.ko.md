# 검증 계획

## 실행할 검증

- `PYTHONPATH=src python3 -m unittest tests/test_parallel_work.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `git diff --check`

## 성공 기준

- 병렬 조사 lane은 merge gate가 있으면 `ready_to_parallelize`.
- 병렬 조사 lane에 merge gate가 없으면 gap.
- merge task가 모든 `wait_for` task에 의존하지 않으면 gap.
