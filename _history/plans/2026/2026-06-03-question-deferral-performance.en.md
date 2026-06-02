# Plan: Question Deferral Performance

## Mode

- work mode: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## Implementation Decisions

- Rust/Tauri question detection scans only the latest 32KB tail of stdout and stderr instead of full session output.
- React active session polling uses an in-flight ref to prevent overlap.
- Decision inbox refreshes are throttled to four seconds even when automatic deferral signals appear.
- Session reports are merged by render signature, and idle elapsed time updates in five-second buckets.

## Validation

- Tests, typecheck, readiness, build, performance budget, static token check, resource/grounding/CLI pipeline/evaluation checks.
