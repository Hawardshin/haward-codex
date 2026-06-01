# Installable App User Flow Spec

## Goal

Define a product flow that lets a user launch the installable agent platform, open a workspace, see current state, start work, track blocked questions, and review results.

## Scope

- User-flow config file
- First-run onboarding
- Home information architecture
- Task run timeline
- Decision inbox
- Developer and superadmin views
- Failure recovery
- HTML flow map

## Non-Scope

- Actual Tauri/Electron installation
- Native installer build
- Signing, notarization, or update implementation
- Real subprocess runner implementation
- Secret storage implementation

## Decisions

- First value means reaching the workspace dashboard, not completing every setup step.
- The default user uses `user` view mode.
- Optional CLIs, notifications, browser automation, and advanced validators must be deferrable as capability cards.
- The superadmin developer flow must expose raw configs, validators, release gates, and source provenance.

## Success Criteria

- `platform-desktop-app/configs/user-flow-registry.json` exists as a self-documenting config.
- First run includes open/create/demo, workspace boundary review, view mode, readiness scan, and dashboard arrival.
- Task run flow includes phase, time, agents, artifacts, decisions, evidence, verification, and commit/push state.
- Failure recovery covers workspace, optional CLI, user decision, snapshot, and update problems.
- Korean/English docs and an HTML flow map exist.
