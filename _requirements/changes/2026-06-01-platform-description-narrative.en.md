# Requirements Change: Platform Description Narrative

## Source Request

- `UR-2026-06-01-021`

## Reason For Change

The user asked for a more detailed and compelling explanation of the platform. The existing README contained strong operating rules and procedures, but its first-read platform identity was too short for a new reader to quickly understand the purpose, operating loop, and accumulated assets.

## Added Requirement

### REQ-WS-037

The platform must provide a detailed first-read identity description in the main entry points and operating model documentation. The description must cover the platform purpose, problem it solves, core operating loop, accumulated assets, project boundaries, and the value of evidence-backed evaluation.

## Impact

- `README.md`
- `agent-platform/README.md`
- `_docs/operating-models/`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_ops/index.md`

## Verification

- Documentation review
- `docs-audit`
- `check-memory-bootstrap`
- `check-config-contract`
- `workspace-health --include-build`
