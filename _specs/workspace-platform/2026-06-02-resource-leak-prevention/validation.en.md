# Resource Leak Prevention Validation

## Automated Checks

- `python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources configs/evaluation/resource-guard-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-resource-leak-prevention.json`

## Manual Review

- Confirm the resource check is conditional, not another full-loop requirement for every task.
- Confirm the user instruction is connected from policy, workflow, prompt, evaluator, and memory bootstrap.

## Close-Out Criteria

- Verification commands pass.
- Evaluation report is `ready_to_close`.
- Omission and resource checks are ready.
