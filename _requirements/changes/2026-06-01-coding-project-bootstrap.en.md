# Requirement Change: Coding Project Bootstrap

- Date: 2026-06-01
- Requirement ID: `REQ-WS-038`
- Source request: `UR-2026-06-01-023`
- Work mode: `standard`

## Change

Add a shared bootstrap tool and workflow so new coding projects do not need to recreate technology-aware structure by hand.

## Requirement

New coding projects shall be bootstrappable from technology-specific blueprints with a dry-run plan first, optional root project registration, project-local README/docs/specs/configs/tests/tools/artifacts, official-doc checklists, and coding-research connection points.

## Rationale

- As projects grow, each project needs clear boundaries and isolated artifacts.
- The user wants convenient project creation while reducing wasted folders and premature dependency installation.
- Official-doc checks and coding-research links should be visible from project creation time.

## Verification

- `_tools/coding-project-bootstrap/` unit tests
- dry-run plan output
- optional registry update behavior
- `structure-audit`
- `workspace-health`
