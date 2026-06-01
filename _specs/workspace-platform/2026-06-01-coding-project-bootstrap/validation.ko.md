# 검증: 코딩 프로젝트 bootstrap

## 예정 검증

- `python3 -m unittest discover -s _tools/coding-project-bootstrap/tests`
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list`
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan sample-agent --blueprint python-agent --register`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ...`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ...`
- `git diff --check`

## 결과

- `python3 -m unittest discover -s _tools/coding-project-bootstrap/tests`: 5개 테스트 통과
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list`: 7개 blueprint 출력
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan sample-agent --blueprint python-agent --register`: root project registry entry 포함 dry-run plan 출력
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-helper --blueprint python-cli --target-dir existing-project/tools/my-helper`: nested target dry-run plan 출력, registry entry 없음
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ... ../_tools/coding-project-bootstrap/configs/blueprints.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py`: repository/prompt map 갱신
- `python3 _tools/task-board/src/task_board.py`: coordination board 갱신
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: 20개 check 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-coding-project-bootstrap-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-coding-project-bootstrap-evaluation-input.json`: `ready_to_close`
