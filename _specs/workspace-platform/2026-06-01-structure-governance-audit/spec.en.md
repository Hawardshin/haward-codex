# Spec: Structure Governance Audit

## Requirement

- `REQ-WS-026`

## Problem

As root folders grow, registered projects, shared operational folders, local-only scratch, and generated outputs can be interpreted differently across documents. `_private/` and `outputs/` are visible in the current structure but their durable-vs-local role was not explicit enough.

## Goals

- Define root folder classes in a self-documenting config.
- Validate the current root structure with a deterministic audit tool.
- Update project boundary docs and workflows to separate local-only folders and generated output.
- Let `workspace-monitor` surface structure-rule documents.

## Non-Goals

- Do not move or rename existing project folders.
- Do not mass-move existing history or requirement files.
- Do not promote root `outputs/` into a durable artifact store.

## Acceptance Criteria

- `_ops/projects/root-structure-policy.json` exists and passes the self-documenting config contract.
- `_tools/structure-audit/` reports unregistered root folders and registered projects missing README files as gaps.
- `python3 _tools/structure-audit/src/structure_audit.py --check` passes on the current repository.
- Related operating docs, workflow, and memory bootstrap manifest are updated.
- `workspace-monitor` snapshot includes `_docs` and `_philosophy` categories.
