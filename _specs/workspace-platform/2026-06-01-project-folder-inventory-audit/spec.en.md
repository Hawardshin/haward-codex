# Project Folder Inventory Audit Spec

## Goal

Verify that durable top-level folders inside registered projects are explained in `_ops/projects/registry.json`, and that generated output patterns are covered by `.gitignore`.

## Requirement

- `REQ-WS-027`

## Scope

- Extend `_tools/structure-audit/`
- Improve `_ops/projects/registry.json` `project_specific_home`
- Improve `_ops/projects/root-structure-policy.json` `generated_output_dirs`
- Update related operating docs and history

## Out Of Scope

- Mass-moving project folders
- Relocating existing history, requirement, or evaluation files
- Deleting generated outputs

## Acceptance Criteria

- Audit output includes `project_inventories`.
- Durable top-level folders missing from the registry produce warnings.
- Generated output patterns missing from `.gitignore` produce gaps.
- The current repository passes with no gaps or warnings.

