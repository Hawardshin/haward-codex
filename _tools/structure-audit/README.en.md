# Structure Audit

This tool checks whether root folders are registered projects, shared operational folders, or local-only folders, and whether registered project top-level directories are explained in the project registry.

## Inputs

- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`
- `.gitignore`
- first-level repository directories
- first-level registered project directories

## Output

- root directory classification
- gaps for unregistered root folders
- gaps for registered projects missing `README.md`
- gaps for local-only folders missing `.gitignore` coverage
- gaps for generated output patterns missing `.gitignore` coverage
- registered project top-level folder inventory
- warnings for project top-level folders not listed in `project_specific_home`

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
- Add new durable top-level project folders to that project's `project_specific_home`.
- Keep generated folders in both `_ops/projects/root-structure-policy.json` `generated_output_dirs` and `.gitignore`.
- Use `_private/` and `outputs/` only as local-only folders, not as durable knowledge sources.
- Project artifacts belong under the owning project's `artifacts/`, not root `outputs/`.
