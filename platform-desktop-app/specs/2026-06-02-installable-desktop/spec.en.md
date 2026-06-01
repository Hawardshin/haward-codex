# Installable Desktop App Structure Spec

## Goal

Create an independent project and baseline distribution decision structure for turning the platform into installable software.

## Scope

- New root project `platform-desktop-app/`
- Self-documenting desktop distribution registry
- Product boundary docs
- Packaging strategy docs
- Project-local requirements/specs
- Shared policy, router, history, and evaluation links

## Out Of Scope

- Installing Tauri or Electron
- Implementing an actual desktop app
- Preparing signing certificates
- Implementing release pipelines

## Decision

The first direction is a Tauri-first desktop shell, but the final decision is not locked. Electron and native-packaging-only remain comparison candidates.

## Success Criteria

- The project is registered in `_ops/projects/registry.json`.
- The desktop distribution registry includes `reader_guide`, `reference_links`, `structure_rules`, and `field_guide`.
- The difference between `install_mode` and installer packaging is documented clearly.
- Release gates consider macOS, Windows, and Linux.
- The records state that no actual dependency installation occurred.
