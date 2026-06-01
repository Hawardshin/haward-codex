# Requirement Review: Workspace Health Source Structure Refactor

## Review Target

- `REQ-WS-034`
- User request: "refactoring folder structure source structure"

## Decision

- Status: approved
- Owner: `_tools/workspace-health`
- Change type: internal source-structure improvement for an operations tool

## Review Notes

- Broadly moving root folders would risk breaking maps, dashboards, and workflow paths.
- This change therefore starts with a narrow refactor of `workspace-health`, the repository-wide verification entrypoint.
- The legacy script command is preserved to avoid usability regression.

## Required Verification

- `workspace-health` unit tests
- legacy script entrypoint run
- JSON/category output check
- full `--include-build` health check
