# Validation: Stack-Aware Coding Research

## Checks

- `PYTHONPATH=src python3 -m unittest tests/test_coding_research.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`
- `python3 -m json.tool` for changed JSON configs
- `check-config-contract`, `check-memory-bootstrap`, `validate-knowledge`, `check-grounding`, `evaluate-work`
- Task board/workspace index generation or check
- `git diff --check`

## Expected Result

- All tests pass.
- The coding research template returns `ready_to_implement`.
- The evaluator returns `ready_to_close`.
