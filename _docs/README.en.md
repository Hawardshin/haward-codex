# Workspace Docs

## Purpose

`_docs/` stores workspace-wide operating documents and decision documents. Project-specific documentation belongs in that project's `docs/` folder.

## Categories

| Folder | Purpose |
| --- | --- |
| `instructions/` | Durable instructions and baseline workspace rules |
| `policies/` | Execution policies for validation, research, installation, requirements, specs, and documentation language |
| `operating-models/` | Platform operating model, context model, and tool-agnostic assistant operating model |
| `governance/` | Management rules such as capability promotion and repository structure governance |

## Missing-Doc Prevention

- Check `_docs/registry.json` category rules when adding a new document.
- Put new documents in a category folder, not directly under `_docs`.
- Important bilingual docs should keep `.ko.md` and `.en.md` companions together.
- After changing `_docs`, run:

```bash
python3 _tools/docs-audit/src/docs_audit.py --check
```

## Related Files

- `_docs/registry.json`
- `_tools/docs-audit/README.en.md`
- `_ops/index.md`
