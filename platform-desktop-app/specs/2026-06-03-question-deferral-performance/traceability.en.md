# Question Deferral Performance Traceability

| Requirement | Implementation | Validation |
| --- | --- | --- |
| PDA-UX-022 bounded scan | `MAX_DECISION_SCAN_BYTES`, `recent_session_output` | readiness/test/static token |
| PDA-UX-022 overlap prevention | `activeSessionPollInFlightRef` | TypeScript check |
| PDA-UX-022 throttle | `INBOX_REFRESH_THROTTLE_MS` | TypeScript check |
| PDA-UX-022 render merge | `mergeSessionReports`, render signature bucket | TypeScript check, performance budget |

## External Evidence

- React `useEffect` is used for synchronizing with external systems and cleaning up intervals.
- Rust `std::process::Child` requires explicit lifecycle and wait/cleanup management.
