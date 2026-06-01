# Naming Audit Tool

## Purpose

Check the mechanically enforceable naming rules defined in `_ops/naming/naming-policy.json`.

## Command

```bash
python3 _tools/naming-audit/src/naming_audit.py --check
```

For the JSON report only:

```bash
python3 _tools/naming-audit/src/naming_audit.py
```

## Scope

- root project names and paths
- reserved operational directory names
- runtime adapter directory names
- `_tools/*` folder names
- `_skills/*` folder names
- `_docs` Markdown file slugs
- shared/project spec directory date slugs
- Python source package/module names under `src/`
- JSON config file names and top-level `name`/`id` values

## Output

- `status`: `clean` or `naming_rework_required`
- `gaps`: naming rule violations to fix
- `warnings`: non-blocking notes
- `checked`: check count summary
