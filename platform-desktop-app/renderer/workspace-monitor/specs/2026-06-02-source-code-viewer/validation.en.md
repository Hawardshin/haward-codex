# Validation Plan

## Functional Validation

- `npm test`
- `npm run collect`
- Check that the snapshot contains `sourceFiles` and `stats.sourceFiles`
- Check that Developer/Superadmin view modes include `source` and User View does not

## Build Validation

- `npm run check`
- `npm run build`

## Platform Validation

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m unittest discover -s tests`
- `python3 _tools/workspace-health/src/workspace_health.py`

## Evaluation Validation

- `check-omissions`
- `check-grounding`
- `evaluate-work`
