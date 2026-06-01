# Project Folder Inventory Audit Plan Record

## User Request

Re-check the overall structure improvement request and improve remaining folder structure or management contradictions.

## Work Mode

- `governance`

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-01-structure-governance-audit.en.md`
- Internal policy: `_ops/projects/root-structure-policy.json`, `_docs/project-boundary-policy.en.md`
- Existing audit result: root structure was clean, but project-internal top-level folder explanation checks were missing.

## Plan

1. Check the existing structure audit and project registry.
2. Add project top-level folder inventories to audit output.
3. Warn when durable folders are missing from `project_specific_home`.
4. Report gaps when generated output patterns are missing from `.gitignore`.
5. Fill missing registry and policy entries.
6. Update docs, requirements, specs, history, and evaluation.
7. Verify, commit, and push.

## Plan Change

- Do not perform a large folder move. The remaining issue is missing explanation and verification coverage, not physical placement.

