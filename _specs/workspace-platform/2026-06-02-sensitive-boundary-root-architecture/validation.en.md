# Validation

## Required Checks

- `check-config-contract` for `sensitive-file-boundary.json`
- `privacy-audit --check`
- `structure-audit --check`
- `docs-audit --check`
- `naming-audit --check`
- `check-memory-bootstrap`
- `check-config-contract` for core settings
- `workspace-index`
- `workspace-monitor npm run collect`
- `workspace-monitor npm run build`
- `check-omissions`
- `check-grounding`
- `evaluate-work`

## Acceptance Criteria

- `_private/` content paths do not appear in repository maps or monitor snapshots.
- `_private/` is visible as a boundary, but its contents are not default AI context.
- Root folders are explained through logical layers.
