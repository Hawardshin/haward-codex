# Docs Taxonomy And Missing-Document Audit Requirement Change

## Change Summary

- Date: 2026-06-01
- Change ID: `REQ-CHANGE-2026-06-01-DOCS-TAXONOMY-AUDIT`
- Related request: `UR-2026-06-01-014`
- Added requirement: `REQ-WS-031`
- Status: Applied

## User Intent

As the conversation and work history grow, important documents can be missed in the current structure. `_docs/` needs type-based folders and a repeatable way for future sessions to detect missing documents.

## Changes

- Split `_docs/` into `instructions`, `policies`, `operating-models`, and `governance`.
- Add `_docs/registry.json` with category purpose, allowed root files, required documents, bilingual companion policy, and audit command.
- Add `_tools/docs-audit/` to validate root sprawl, category placement, required documents, and Korean/English companions.
- Connect the new structure and audit command from `AGENTS.md`, README, `_ops/index.md`, persistent instructions, and memory bootstrap.

## Evidence

- Diataxis organizes documentation around user needs and document purpose.
- GitLab documentation guidance uses topic-type separation such as concept, task, reference, and troubleshooting.
- Google Developer Documentation Style Guide provides a broad reference for consistent technical documentation style and organization.

## Impact

- `_docs/`
- `_tools/docs-audit/`
- `AGENTS.md`, `README.md`, `_ops/index.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- History, requirements, specs, and evaluation records
