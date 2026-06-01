# Validation: Model-Adaptive Prompting

## Checks To Run

- `python3 -m json.tool agent-platform/configs/usage/ai-usage-gap-profile.json`
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <grounding.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <evaluation-input.json>`
- `python3 _tools/work-timer/src/work_timer.py check <timing.json>`
- `git diff --check`

## Manual Review

- Confirm that two-pass prompting is scoped to weak, non-reasoning, or uncertain models and high-variance tasks.
- Confirm that repeated agreement is not treated as factual proof.
