# Question Deferral Implementation Plan

## Selected Direction

Keep the existing Rust `std::process` pipe session structure and extend polling so question candidates can trigger a defer message to stdin. The UI periodically polls active sessions so automatic deferral can run even when the user is away.

## Steps

1. Add automatic deferral settings, deferred prompt keys, and capture error state to Tauri sessions.
2. Expose pending/deferred/auto-deferral state in session reports.
3. Expand question detection with English and Korean operational question patterns.
4. Add shared automatic, manual, and bulk deferral helpers that store deferred decisions in the decision inbox.
5. Add Workspace Monitor Desktop controls for auto-deferral, bulk deferral, and active-session polling.
6. Update readiness/test/check records and validate the performance budget.

## Risks and Controls

- False positives: fail toward deferral rather than authorizing source-affecting work.
- Duplicate storage: prevent through session-scoped prompt keys.
- Resource leak: reuse the existing poll lifecycle and do not spawn extra CLI processes.
- Optional CLI: missing tools stay lane-level capability gaps.
