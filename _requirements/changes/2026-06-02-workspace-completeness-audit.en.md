# Requirement Change: Whole-Workspace Completeness Audit

## Summary

Adds `REQ-WS-075` so whole-workspace completeness audits cover current security, structure, configuration, project, tool, and frontend verification.

## Reason

The user asked to inspect the project for unfinished work, contradictions, odd cases, and overall completeness gaps. The existing `workspace-health` check covered only part of the repository and did not yet include privacy audit, presentation browser validation, desktop readiness, or the latest core config contract list.

## Scope

- `_tools/structure-audit/`: classify root generated outputs correctly.
- `_tools/workspace-health/`: add privacy, browser, desktop, and current config-contract checks.
- `_specs/`: remove stale unfinished-looking validation headings and leftover commit/push checkboxes.
- `_history/evaluations/`: add health report and evaluation records.

## Evidence

- GitHub Docs: work planning and tracking
- Nx Docs: monorepo folder structure
- OpenTelemetry: spans as operation timing units
- Technical debt management research: discovered debt can be abandoned without consistent tracking
