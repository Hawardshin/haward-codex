# Project Folder Inventory Audit Requirement Review

## Review Target

- Requirement: `REQ-WS-027`
- Change record: `_requirements/changes/2026-06-01-project-folder-inventory-audit.en.md`
- Baseline: `_requirements/baselines/2026-05-31-workspace-platform.en.md`

## Result

- Status: approved
- Reason: Root structure policy alone does not keep durable project-internal folder semantics visible over time.
- Relationship to existing requirements: `REQ-WS-026` covers root folder classification; `REQ-WS-027` covers registered project top-level folder inventory and generated output ignore validation.

## Acceptance Criteria

- Durable top-level folders that exist on disk, such as `agent-platform/specs/` and `workspace-monitor/public/`, are explained in the registry.
- Generated output patterns are represented in both policy and `.gitignore`.
- Structure audit passes with no gaps or warnings.

