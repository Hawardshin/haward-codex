# Spec: Sensitive Boundary And Root Architecture

## Background

The previous structure had `_private/` as a local-only folder, but the visible sensitive-file operating contract and AI default-deny rule were too weak. Root folders also grew enough that operational folders, project folders, runtime adapters, and local-only folders needed stronger abstraction.

## Goals

- Route sensitive files to `_private/sensitive/` or an external secret manager.
- Explicitly deny AI default read/index access to `_private/`.
- Prevent maps, snapshots, source collectors, public artifacts, and installers from including `_private/` contents.
- Explain root folders through logical layers.

## Non-Goals

- Do not bring real secret values into the repository.
- Do not inspect or audit `_private/` contents.
- Do not mass-move existing projects.

## Outputs

- `agent-platform/configs/security/sensitive-file-boundary.json`
- `_docs/policies/sensitive-file-boundary-policy.en.md`
- `_ops/security/README.en.md`
- `_ops/workflows/77-sensitive-file-handling.md`
- `_ops/prompts/107-sensitive-file-handling.md`
- `_tools/privacy-audit/`
- Logical layers in `_ops/projects/root-structure-policy.json`
