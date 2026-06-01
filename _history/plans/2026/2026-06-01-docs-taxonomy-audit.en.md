# Docs Taxonomy And Missing-Document Audit Plan Record

## Overview

- Date: 2026-06-01
- Related request: `UR-2026-06-01-014`
- Related requirement: `REQ-WS-031`
- Work mode: `standard`

## Plan Steps

1. Use web search to check documentation taxonomy and information architecture evidence.
2. Classify current `_docs/` files into instructions, policies, operating models, and governance.
3. Add category READMEs and `_docs/registry.json` so humans can understand the structure quickly.
4. Add `_tools/docs-audit/` to check root sprawl, category mismatch, required-document gaps, and Korean/English companion gaps.
5. Connect the new structure from operating rules and memory bootstrap.
6. Update requirements, specs, history, and evaluation.
7. Verify, commit, and push.

## Evidence And Sources

- Diataxis: https://diataxis.fr/
- GitLab documentation topic types: https://docs.gitlab.com/development/documentation/topic_types/
- Google Developer Documentation Style Guide: https://developers.google.com/style/

## Decisions During Work

- Adapted Diataxis' purpose-based separation to this repository's operating-document needs as `instructions`, `policies`, `operating-models`, and `governance`.
- Made `registry.json` a self-documenting config so a future agent can understand structure and audit command by opening one file.
- Made docs-audit prioritize actionable gaps so real omissions surface quickly.
