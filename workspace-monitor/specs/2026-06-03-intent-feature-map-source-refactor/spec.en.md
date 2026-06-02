# Spec: Intent Feature Map Source Structure Refactor

## Status

- Status: `implemented`
- Date: 2026-06-03
- Owning project: `workspace-monitor/`
- Requirement: `REQ-WM-022`
- Source request: `UR-2026-06-03-018`

## Problem

When `scripts/collect-workspace.mjs` owns repository snapshot assembly and feature-specific parsing at the same time, each new feature increases the collector's change surface and makes regressions harder to isolate.

## Behavior

- `scripts/lib/intent-feature-map.mjs` owns `intentFeatureMap` collection and Markdown roadmap parsing.
- `scripts/collect-workspace.mjs` keeps snapshot assembly responsibility and connects the intent-map collector through import/re-export.
- The existing `collectIntentFeatureMap` API imported by tests remains compatible.
- Customer snapshots reuse the new module's `emptyIntentFeatureMap()` structure for redacted intent maps.

## Non-Goals

- UI layout changes
- Roadmap parsing behavior changes
- Root folder restructuring
- Exposing internal intent maps in customer snapshots
