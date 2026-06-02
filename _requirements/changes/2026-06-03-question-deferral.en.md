# Requirement Change: Question Deferral

## Change

- Added `PDA-UX-021`: when a running CLI outputs a user question, the platform should send a defer message to that lane, store the question in the decision inbox, and let the user answer/resume after returning.

## Reason

When an external CLI asks a question while the user is away, the whole task should not stall indefinitely or make an arbitrary source-affecting decision. The platform should defer decisions while allowing independent work to continue.

## Impact

- Tauri session reports now include automatic deferral state.
- The Workspace Monitor Desktop tab includes an auto-deferral toggle and a bulk detected-question deferral action.
- Decision inbox items use `deferred` status and session metadata.
