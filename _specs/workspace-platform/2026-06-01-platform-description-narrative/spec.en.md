# Spec: Platform Description Narrative

## Purpose

Improve the first-read explanation so a new reader can quickly understand that this repository is a personal AI agent-building platform, not just a collection of operating rules.

## Requirement

- `REQ-WS-037`

## Scope

- Root README first-read description
- `agent-platform/README.md` core project description
- Paired `_docs/operating-models/platform-identity-operating-model.*.md` documents
- Discoverability from `_ops/index.md` and memory bootstrap

## Out Of Scope

- Runtime agent feature changes
- UI design changes
- New project creation

## Acceptance Criteria

- The root README explains the platform purpose, problem solved, core loop, and accumulated assets.
- A separate operating model document explains the platform identity in more detail.
- The core project README describes the role of `agent-platform/` concretely.
- The new description is discoverable from `_ops/index.md`, `_docs/operating-models/README.*.md`, and memory bootstrap.
- Documentation/config audits and full workspace health pass.
