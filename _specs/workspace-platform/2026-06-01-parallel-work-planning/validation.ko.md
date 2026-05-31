# 검증 계획

## 실행할 검증

- `python3 -m json.tool` for changed JSON configs
- `PYTHONPATH=src python3 -m unittest tests/test_parallel_work.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `git diff --check`

## 성공 기준

- 독립 batch가 있으면 `ready_to_parallelize`.
- 순환 의존성, 알 수 없는 dependency, 같은 batch path overlap은 gap.
- 템플릿, config, memory, map, board 검증이 통과.
