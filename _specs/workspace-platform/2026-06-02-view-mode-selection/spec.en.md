# Spec: View Mode Selection

## Requirement

- `REQ-WS-061`

## Goal

Separate user, developer, and superadmin development views across the platform through `view_mode`. This is a UI and operations lens and does not replace `install_mode` or `work_mode`.

## Scope

- `agent-platform/configs/access/view-mode-registry.json`
- `agent-platform/src/agent_platform/view_modes.py`
- CLI: `check-view-modes`, `list-view-modes`, `show-view-mode`
- `view-mode-router-agent` config and docs
- Policy, workflow, prompt, and memory bootstrap links

## Non-Goals

- Login, authentication, or server-side authorization
- Public snapshot redaction implementation
- Complete multi-user permission model

## Decisions

- Allowed mode IDs are `user`, `developer`, and `superadmin_developer`.
- Current default is `superadmin_developer`.
- UI hiding is not a security boundary; public or multi-user deployments need collector or server authorization enforcement.
