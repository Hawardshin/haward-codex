# Project Folder Inventory Audit Requirement Change

## Change Summary

- Date: 2026-06-01
- Change type: requirement addition
- Added requirement: `REQ-WS-027`
- Work mode: `governance`

## Change

Durable top-level folders in registered projects must be explained in `_ops/projects/registry.json` `project_specific_home`. Generated folder and file patterns must be recorded in `_ops/projects/root-structure-policy.json` `generated_output_dirs` and ignored by `.gitignore`.

## Rationale

Root folder classification was already audited, but the audit did not verify whether project-internal top-level folders were explained in the registry. Over time, folders such as `public/`, `data/`, or `specs/` can lose clear ownership semantics without this inventory.

## Verification Criteria

- `structure-audit` outputs a top-level folder inventory for each registered project.
- Durable top-level folders missing from `project_specific_home` are reported as warnings.
- `generated_output_dirs` patterns missing from `.gitignore` are reported as gaps.
- The current repository structure passes with no warnings or gaps.

