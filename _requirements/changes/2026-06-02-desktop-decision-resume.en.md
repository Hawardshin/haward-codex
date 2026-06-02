# Requirement Change: Desktop Decision Resume

- Date: 2026-06-02
- Request ID: `UR-2026-06-02-051`
- Work mode: `governance`

## Change Summary

Add linked active CLI session resume to the decision inbox flow for the installable multi-CLI desktop app.

## Added Requirements

- `PDA-REQ-023`: For a decision created by an active CLI session and carrying session metadata, the Desktop MVP shall let the user explicitly answer and resume, saving the decision answer and then sending the same answer to the linked session stdin while refreshing the session report.
- `PDA-UX-016`: The Desktop tab shall distinguish answer-only from answer-and-resume actions for decisions linked to an active CLI session, and show the linked session id/status plus resume result.

## Non-Changes

- A CLI decision answer does not automatically resume every workflow.
- PTY, shell plugin, xterm.js, Monaco, and installer dependencies are not installed.
- No public-ready macOS app claim is made.
