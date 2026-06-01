# Requirement Change: Structure Governance Audit

## Change ID

- `REQ-WS-026`

## Source Request

- `UR-2026-06-01-009`

## Change

- Root folders must be classified as registered projects, reserved operational folders, local-only folders, or generated outputs.
- `_private/` and `outputs/` are local-only ignored folders only.
- Durable artifacts belong under the owning project's `artifacts/`, not root `outputs/`.
- After root folder, project registry, or reserved folder rule changes, a deterministic structure audit must run.
- Workspace Monitor should include `_docs` and `_philosophy` in its snapshot so structure rules are easier to find.

## Rationale

- The existing structure had a project registry and reserved folder policy, but local-only exceptions were not explicit.
- Root `outputs/` could be mistaken for a durable artifact location by name.
- Document-only review does not automatically catch missing root-folder registration.

## Verification

- `root-structure-policy.json` must pass the self-documenting config contract.
- `structure-audit` must report unregistered root folders and registered projects missing README files as gaps.
- The current repository root structure must pass `structure-audit --check`.
