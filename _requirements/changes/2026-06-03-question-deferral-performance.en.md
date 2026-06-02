# Requirement Change: Question Deferral Performance

## Change

- Added `PDA-UX-022`: CLI question deferral and active session polling shall use bounded scanning, overlap prevention, inbox throttling, session report merging, and idle elapsed-time buckets.

## Reason

Multiple CLI lanes and long terminal outputs can make full-output scans and repeated React state replacement expensive on every poll.

## Impact

- Bounds question-detection CPU cost.
- Reduces overlapping automatic polling calls.
- Reduces UI rerender churn.
