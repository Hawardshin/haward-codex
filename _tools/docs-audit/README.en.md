# Docs Audit

## Purpose

This tool checks whether `_docs/` files live in category folders, required documents are present, and Korean/English companion documents stay paired.

## Inputs

- `_docs/registry.json`
- Markdown files under `_docs/`

## Output

- document counts by category
- gaps for misplaced root Markdown files
- gaps for missing required registry documents
- gaps for files that do not match category include patterns
- gaps for missing `.ko.md`/`.en.md` companions

## Command

Run from the repository root.

```bash
python3 _tools/docs-audit/src/docs_audit.py --check
```

## Verification

```bash
python3 -m unittest discover -s _tools/docs-audit/tests
```

## Operating Rules

- Put new `_docs` documents in a category folder.
- Update `_docs/registry.json` first when a new category is needed.
- Keep important durable docs bilingual.
- After changing `_docs`, regenerate the workspace index and monitor snapshot.
