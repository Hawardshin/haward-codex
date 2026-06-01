# `_docs` Taxonomy And Missing-Document Audit Plan

## Plan

1. Check web references for documentation information architecture and taxonomy.
2. Classify current `_docs/` files by document type.
3. Add a registry and README indexes so humans can find paths quickly.
4. Add a docs-audit tool to detect missing and misplaced documents.
5. Connect operating rules, memory bootstrap, requirements, history, and evaluation.
6. Run docs-audit, config contract, memory bootstrap, structure checks, and tests.

## Evidence

- Diataxis: structure by document purpose and user need.
- GitLab topic types: topic-type separation for documentation.
- Google Developer Style Guide: technical documentation style and organization reference.

## Risks And Controls

- Risk: old `_docs/<file>` paths may remain and break links.
- Control: search old paths with `rg` and regenerate the workspace index.
- Risk: docs-audit may become too strict and block valid docs.
- Control: keep category include patterns and required documents explicit in the registry.
