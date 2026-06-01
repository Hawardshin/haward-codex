# Workspace Monitor History/Structure UI Plan Record

## Overview

- Date: 2026-06-01
- Related request: `UR-2026-06-01-015`
- Related requirements: `REQ-WM-007`, `REQ-WM-008`
- Work mode: `standard`

## Plan

1. Check evidence for Next.js static export, React list/filter rendering, and documentation information architecture.
2. Inspect how the existing collector gathers `_history` and project documents.
3. Extract dates from `_history/**/YYYY/YYYY-MM-DD...` paths and build `historyDays`.
4. Read root structure policy, docs registry, and project registry to build `folderStructure`.
5. Extend the History UI with a date-indexed timeline and date/type filters.
6. Add a Structure UI for root folders, docs categories, project homes, and history source roots.
7. Run tests, TypeScript check, build, snapshot smoke checks, and evaluation.

## Decisions

- Keep the existing static snapshot model instead of adding a server database or GitHub API.
- Store lightweight document summaries in the history timeline rather than duplicating HTML bodies.
- Reuse existing registries and policies for folder structure instead of creating a new separate setting.
