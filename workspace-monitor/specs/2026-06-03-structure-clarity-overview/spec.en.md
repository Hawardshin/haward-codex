# Spec: Structure Clarity Overview

## Purpose

The Workspace Monitor Structure screen should show the platform's operating planes and ownership boundaries before listing folders. A user should be able to see what `_ops`, `_history`, `agent-platform`, `platform-desktop-app`, `workspace-monitor`, domain projects, and runtime/local data own from one screen.

## Scope

- Add `structureOverview` to the snapshot.
- `structureOverview` includes planes, boundary rules, source hotspots, and pressure points.
- The Structure tab shows Architecture Backbone, Pressure, and Boundary Rules before root folder tables.
- Overview shows a compact Architecture Backbone.
- The customer snapshot strips internal structure overview, source hotspots, and pressure points.

## Non-Goals

- Do not migrate root folders or durable paths in bulk.
- Do not fully split `MonitorShell.tsx` or Tauri `lib.rs` in this slice.
- Do not treat client-side structure display as a security boundary.

## Acceptance

- `snapshot.structureOverview.summary.totalPlanes` is greater than 0 in the developer snapshot.
- The Structure tab renders Architecture Backbone, structural pressure points, and Boundary Rules.
- The customer snapshot has an empty `structureOverview`.
- `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, `npm run check:intent-map`, and `npm run check:intent-map:customer` pass.
