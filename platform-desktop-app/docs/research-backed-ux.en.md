# Platform Desktop App Research-Backed UX Improvement

## Purpose

The installable app UX goal is not to finish every setup step at once. It is to let the user understand current status, choose the next action, and recover from blockers.

## User Journey

1. Choose a workspace.
2. Confirm read/exclude/sensitive-file boundaries.
3. Select a view mode.
4. Pass required readiness checks.
5. Use the command center to see status, attention, evidence, and decision inbox.

## Core UX Principles

- Missing optional CLIs should not fail the whole app.
- Pending user decisions should be collected in the decision inbox instead of stopping all work.
- Public deployment and snapshots should make privacy review state clear.
- Failed validation should be visible in a rework lane.

## Artifact

- `platform-desktop-app/artifacts/user-flow-map.html`
