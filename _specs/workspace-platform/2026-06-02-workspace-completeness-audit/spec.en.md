# Spec: Whole-Workspace Completeness Audit

## Purpose

Find and fix unfinished work, contradictions, false-positive audit failures, and stale verification coverage across the repository, then preserve the result as a reusable health gate.

## Requirements

- Follow `REQ-WS-075`.
- Do not directly read or index `_private/` contents.
- Run existing audits/tests/builds first and use real failures as the basis for fixes.
- The health gate must cover current core settings, privacy audit, browser validation, desktop readiness, and frontend build.
- Rename plan-section headings that look like unfinished work.

## Out Of Scope

- Installing a real secret manager
- Large folder moves
- Product feature work
