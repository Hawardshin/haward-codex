# Plan: Question Deferral

## Work Mode

- `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## Scope

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- desktop readiness/test/check records
- requirements/spec/history/evaluation records

## Decisions

- Automatic deferral is enabled by default.
- Question detection starts as stdout/stderr line-based heuristics.
- Automatic deferral is triggered through periodic UI polling of active sessions.
- Deferred questions are stored in the decision inbox with `deferred` status.
- Manual defer can still send a defer message to the lane even when no question candidate was detected.

## Validation Plan

- Workspace Monitor collect/test/check/build/perf
- Platform desktop readiness test/check
- static built output token check
- omission/resource/grounding/cli-pipeline/work-timer/evaluate-work
- git diff check, commit, push
