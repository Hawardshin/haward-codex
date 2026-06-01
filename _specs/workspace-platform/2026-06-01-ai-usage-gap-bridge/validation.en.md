# Validation: AI Usage Gap And Bridge

## Required Checks

- `python3 -m json.tool agent-platform/configs/usage/ai-usage-gap-profile.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `hallucination-guard-agent` grounding check
- `work-evaluator-agent`

## Manual Review

- The profile classifies gaps as work-system problems without blaming the user.
- The workflow and prompt can execute bridge interventions.
- External sources record freshness, reliability, and limitations.
