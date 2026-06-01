# `_docs` Taxonomy And Missing-Document Audit Spec

## Purpose

Prevent important operating documents under `_docs/` from sprawling at the root or going missing as work and documentation grow, by adding type-based categories and a deterministic audit.

## Requirements

- Related requirement: `REQ-WS-031`
- Related request: `UR-2026-06-01-014`
- Work mode: `standard`

## Scope

- Reclassify `_docs/` documents.
- Add `_docs/registry.json`.
- Add `_tools/docs-audit/`.
- Connect operating rules, memory bootstrap, history, and evaluation.

## Out Of Scope

- Restructuring project-specific `docs/` folders.
- Redesigning the full taxonomy of `_history`, `_research`, or `_ops`.
- Large rewrites of document bodies.

## Functional Criteria

- `_docs` root shall contain only registered index files.
- Durable docs shall live in registered category folders.
- The audit shall fail if required documents disappear.
- Missing `.ko.md` or `.en.md` companions shall be detected.
- Future agents shall discover the docs registry through memory bootstrap.
