# Plan Record: Workspace Health Source Structure Refactor

## Request

- Summary: refactor folder and source structure.
- Work mode: `standard`

## Evidence Checked

- Web search record: `_history/web-searches/2026/2026-06-01-workspace-health-source-refactor.en.md`
- Existing requirements: `REQ-WS-032`, `REQ-WS-033`
- New requirement: `REQ-WS-034`
- Current structure: `_tools/workspace-health/src/workspace_health.py` mixed CLI handling, check definitions, execution, and serialization in one file.

## Selected Direction

- Do not broadly move root folders in this pass.
- Split `workspace-health` into a legacy wrapper and package modules.
- Preserve the existing command so operating docs and automation do not break.

## Acceptance Criteria

- Unit tests pass
- Existing script entrypoint passes
- Category JSON output passes
- Full `--include-build` health check passes
- Evaluation and history records are saved
