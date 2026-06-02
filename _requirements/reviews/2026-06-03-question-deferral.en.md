# Requirement Review: Question Deferral

## Review Result

- The requirement does not conflict with `PDA-UX-006`, `PDA-UX-011`, `PDA-UX-014`, `PDA-UX-016`, or `PDA-UX-020`.
- It reuses the existing answer/resume decision flow.
- It does not make optional CLIs mandatory.

## Acceptance Conditions

- Automatic deferral is enabled by default but can be disabled in the UI.
- Duplicate question storage must be prevented.
- A defer message must not replace user approval or rejection.
- Resource lifecycle validation must cover active polling and child-process pipe state.
