# Spec: Workspace Monitor View Mode Selector

## Requirements

- `REQ-WM-011`
- `REQ-WS-061`

## Goal

Workspace Monitor reads the platform `view-mode-registry.json` and allows selecting user, developer, and superadmin development views.

## Scope

- Add `viewModeCatalog` to the snapshot
- Add a top-level view mode selector
- Filter sections and documents by the selected mode
- Keep superadmin development mode as the default

## Non-Goals

- Authentication, login, or user accounts
- Server authorization enforcement
- Complete public snapshot redaction
