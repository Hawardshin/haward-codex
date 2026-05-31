# Work Mode Routing Validation

## Validation Plan

- Run `work_evaluator.py` unit tests.
- Run the full `agent-platform` unittest suite.
- Check the self-documenting contract for `work-mode-registry.json` and core settings files.
- Confirm the memory bootstrap manifest recognizes the new mode registry anchor.
- Run coding research, research planning, knowledge skeptic, hallucination guard, and work evaluator CLI checks.
- Refresh the task board and workspace index.

## Current Result

- `PYTHONPATH=src python3 -m unittest tests/test_work_evaluator.py`: pass
- `PYTHONPATH=src python3 -m unittest discover -s tests`: pass, 72 tests
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ... configs/workflows/work-mode-registry.json ...`: pass, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: pass, `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research /tmp/codex-work-mode-coding-research.json`: pass, `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /tmp/codex-work-mode-research-plan.json`: pass, `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /tmp/codex-work-mode-knowledge-validation.json`: pass, `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /tmp/codex-work-mode-grounding.json`: pass, `ready_to_publish`

## Note

- The root `a.txt` deletion existed before this work and is unrelated, so it will not be staged.
