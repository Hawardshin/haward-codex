# Workspace Monitor Research-Backed UX Improvement

## Purpose

`workspace-monitor` is an operating surface for the agent platform, not only a document viewer. Its first view should show current status, blockers, next actions, evidence trail, and view/language mode before project or document counts.

## Applied Principles

- AI UX should make capability, limitations, explanations, and global controls clear.
- Dashboards should use strong hierarchy and a limited set of key metrics before deeper drill-down.
- Users should immediately understand system status and recognize important choices without recall burden.
- Evidence trail is a verification handle, not persuasive decoration.

## Implementation Summary

- Add a command center at the top of overview.
- Summarize blocked tasks, public readiness, and active work as one attention state.
- Show next action, evidence, and mode control as an operating spine.
- Preserve existing projects/history/documents/source/requirements/agents tabs as drill-down navigation.

## Verification

- `npm run test`
- `npm run check`
- `npm run build`
- Playwright screenshot smoke
