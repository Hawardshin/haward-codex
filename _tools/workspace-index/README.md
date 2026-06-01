# Workspace Index Tool

## Purpose

Generate `_ops/maps/repository-map.md` and `_ops/maps/prompt-map.md` so future work can find structure and prompts without repeated manual exploration.

## Command

From the repository root:

```bash
python3 _tools/workspace-index/src/workspace_index.py
```

Check mode:

```bash
python3 _tools/workspace-index/src/workspace_index.py --check
```

## Inputs

- Repository files and folders
- `_ops/prompts/*.md`
- `_ops/workflows/*.md`
- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`

## Outputs

- `_ops/maps/repository-map.md`
- `_ops/maps/prompt-map.md`

## Verification

```bash
python3 -m unittest discover -s _tools/workspace-index/tests
python3 _tools/workspace-index/src/workspace_index.py --check
```
