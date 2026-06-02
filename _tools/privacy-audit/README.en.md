# Privacy Audit

`privacy-audit` checks sensitive-file boundaries without reading the actual contents of `_private/`.

## Checks

- `.gitignore` excludes `_private/`, `outputs/`, `.env`, and key/certificate/container file patterns.
- `repository-map.md` and Workspace Monitor snapshots do not include paths under `_private/`.
- `workspace-index` and Workspace Monitor collection code explicitly exclude `_private/`.
- `agent-platform/configs/security/sensitive-file-boundary.json` exists.

## Run

```bash
python3 _tools/privacy-audit/src/privacy_audit.py --check
```

## Principle

The tool does not inspect `_private/`. It only validates existence of the boundary, exclusion rules, and generated-output safety.
