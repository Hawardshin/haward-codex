# Plan: Structure Clarity Overview

## Mode

- work_mode: `governance`
- Reason: This is a durable change to platform structure visibility and screen information architecture.

## Large Scope Decomposition

- trigger_conditions: `broad_language`, `large_file_set`, `context_pressure`, `unknown_blast_radius`
- source_inventory: root project registry, Workspace Monitor collector/UI, README/requirements, large source file counts
- exclusions: `_private/`, `node_modules/`, `.next/`, `out/`, Rust `target/`; generated output is verification output, not the reasoning source
- representative_samples:
  - `workspace-monitor/scripts/collect-workspace.mjs`
  - `workspace-monitor/components/MonitorShell.tsx`
  - `workspace-monitor/lib/snapshot.ts`
  - `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
  - `_ops/projects/registry.json`

## Slices

| slice_id | Scope | touch_paths | Verification |
| --- | --- | --- | --- |
| S1 | Structure overview snapshot model | `workspace-monitor/lib/`, `workspace-monitor/scripts/`, `workspace-monitor/tests/` | `npm test`, `npm run check` |
| S2 | Structure/Overview UI ordering | `workspace-monitor/components/`, `workspace-monitor/app/globals.css` | `npm run check`, `npm run build`, screenshot smoke |
| S3 | Requirements/spec/history/evaluation records | `workspace-monitor/docs/requirements/`, `workspace-monitor/specs/`, `_history/` | omission/evaluate-work |

## Decisions

- This slice does not move root folders or fully split source modules.
- Improve user-visible structure first and expose source hotspots as future refactor candidates.
