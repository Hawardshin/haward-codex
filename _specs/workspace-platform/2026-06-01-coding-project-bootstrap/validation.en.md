# Validation: Coding Project Bootstrap

## Verification Plan

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

## Results

- `python3 -m unittest discover -s _tools/coding-project-bootstrap/tests`: 5 tests passed
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list`: listed 7 blueprints
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan sample-agent --blueprint python-agent --register`: dry-run plan included a root project registry entry
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-helper --blueprint python-cli --target-dir existing-project/tools/my-helper`: dry-run plan for nested target had no registry entry
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ... ../_tools/coding-project-bootstrap/configs/blueprints.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py`: repository and prompt maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: 20 checks passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-coding-project-bootstrap-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-coding-project-bootstrap-evaluation-input.json`: `ready_to_close`
