# macOS Execution Structure Requirement Review

## Review Target

- Requirement: `REQ-WS-069`
- Request: `UR-2026-06-02-027`
- Scope: macOS-runnable installable desktop platform structure

## Acceptance Review

- Separate developer local run, internal test `.app`, and public distribution app: accepted.
- Keep ownership in `platform-desktop-app`: accepted.
- Require Developer ID signing, hardened runtime, notarization, stapling when applicable, and clean Mac smoke tests before public macOS distribution claims: accepted.
- Degrade optional missing CLIs at capability level rather than blocking app launch: accepted.
- Keep actual dependency installation and build artifacts out of this structural change: accepted.

## Decision

Approved. This requirement does not conflict with the existing installable software productization, runtime/language direction, CLI adapter boundary, or user-flow registry. It clarifies macOS-specific runnable and release gates.

## Follow-Up

- When scaffolding the actual Tauri project, add installation audit and validation against `macos-execution-profile.json`.
- Before public distribution, create a release procedure that keeps Apple Developer account credentials, certificates, notarization credentials, and update signing keys outside the repository.

