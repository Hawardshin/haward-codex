# Validation: View Mode Selection

## Verification Plan

- `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli list-view-modes configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli show-view-mode configs/access/view-mode-registry.json superadmin_developer`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`

## Acceptance Criteria

- All three view modes exist.
- Default is `superadmin_developer`.
- `view_mode` is documented separately from `install_mode` and `work_mode`.
- Security docs state the limits of client-side hiding.
