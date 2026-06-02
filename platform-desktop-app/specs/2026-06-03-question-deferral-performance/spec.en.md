# Question Deferral Performance Spec

## Purpose

Keep question deferral responsive when multiple CLI lanes and long terminal outputs are active.

## Requirements

- Question detection shall scan a bounded recent output tail instead of full accumulated output.
- Active session polling shall not start a new poll while the previous poll is still running.
- Decision inbox refreshes shall be throttled after automatic deferral signals.
- Polling results shall merge with existing session reports and reuse React state objects when there is no meaningful render change.
- Idle session elapsed display shall update in buckets so quiet sessions do not force large rerenders every two seconds.

## Non-Scope

- Rust/Tauri native benchmark harness
- Adapter-specific semantic question classifiers
- Public macOS installer performance certification

## Acceptance

- `MAX_DECISION_SCAN_BYTES` bounds backend question scanning.
- The UI applies `activeSessionPollInFlightRef`, `INBOX_REFRESH_THROTTLE_MS`, and `mergeSessionReports`.
- readiness/test/typecheck/build/performance budget validation pass.
