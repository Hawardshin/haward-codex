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

## Outputs

- `_ops/maps/repository-map.md`
- `_ops/maps/prompt-map.md`
