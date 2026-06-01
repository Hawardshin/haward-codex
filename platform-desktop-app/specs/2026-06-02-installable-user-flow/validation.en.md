# Validation Plan

## Config Validation

- `python3 -m json.tool platform-desktop-app/configs/user-flow-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json`

## Documentation And Structure Validation

- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/workspace-health/src/workspace_health.py`

## Monitor Integration Validation

- `cd workspace-monitor && npm run collect`
- `cd workspace-monitor && npm test`
- `cd workspace-monitor && npm run check`
- `cd workspace-monitor && npm run build`

## Evaluation Validation

- Create omission input and run `check-omissions`.
- Create grounding input and run `check-grounding`.
- Create work evaluation input and run `evaluate-work`.
