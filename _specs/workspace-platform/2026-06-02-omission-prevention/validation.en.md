# Validation Plan

## Automated Checks

- `python3 -m unittest discover -s tests` from `agent-platform/`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions configs/evaluation/omission-guard-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`

## Manual Review

- Confirm `omission_check_targets` is included in non-`quick` mode requirements.
- Confirm the omission-prevention policy and workflow are linked in Korean and English docs.
