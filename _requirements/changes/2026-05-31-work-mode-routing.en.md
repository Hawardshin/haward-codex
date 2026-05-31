# 2026-05-31 Work Mode Routing Requirement Change

## Change Summary

The user observed that running every loop every time is inefficient and requested selectable modes, including a path where implementation can happen before non-blocking improvements are backfilled.

## Changed Requirement

- Added `REQ-WS-020`: select `quick`, `standard`, `ship_first`, `research`, or `governance` mode and manage required artifacts plus deferred improvements by mode.

## Evidence

- User request summary: `_history/user-requests/2026/2026-05-31.en.md`
- Web search record: `_history/web-searches/2026/2026-05-31-work-mode-routing.en.md`
- External references: Google Engineering Practices, GitHub Flow, Atlassian technical debt guidance

## Impact

- `standard` and `governance` keep the full loop.
- `quick` treats requirements/spec/trace artifacts as non-blocking for tiny work.
- `ship_first` allows implementation and verification first, then records non-blocking improvements in `_ops/backlog/`.
- `research` prioritizes provenance and plan evidence over implementation artifacts.
