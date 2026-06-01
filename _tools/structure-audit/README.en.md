# Structure Audit

This tool checks whether root folders are registered projects, shared operational folders, or local-only folders.

## Inputs

- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`
- `.gitignore`
- first-level repository directories

## Output

- root directory classification
- gaps for unregistered root folders
- gaps for registered projects missing `README.md`
- gaps for local-only folders missing `.gitignore` coverage

## Command

Run from the repository root.

```bash
python3 _tools/structure-audit/src/structure_audit.py --check
```

## Verification

```bash
python3 -m unittest discover -s _tools/structure-audit/tests
```

## Operating Rules

- After creating a new root project, register it in `_ops/projects/registry.json`, then run this tool.
- Add new reserved operational folders to `_ops/projects/root-structure-policy.json` first.
- Use `_private/` and `outputs/` only as local-only folders, not as durable knowledge sources.
- Project artifacts belong under the owning project's `artifacts/`, not root `outputs/`.
