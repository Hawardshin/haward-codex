# Spec: Intent Feature Map UI

## Status

- Status: `implemented`
- Date: 2026-06-03
- Owning project: `workspace-monitor/`
- Requirement: `REQ-WM-021`
- Source request: `UR-2026-06-03-016`

## Problem

The user-intent feature map synthesized 155 structured intents into feature themes and Now/Next/Later candidates, but a document-only artifact is hard to use for product prioritization inside the app.

## Behavior

- The snapshot collector reads the latest Korean intent-feature map under `_history/intent-feature-maps/`, ordered by source date and modified time, into an `intentFeatureMap` object.
- `intentFeatureMap` includes intent counts, theme counts, Now/Next/Later counts, source date, source updated time, available map count, feature themes, roadmap candidates, and source limitations.
- Workspace Monitor shows an `Intent Map` section in developer and superadmin views.
- Overview shows a compact panel with intent counts, themes, Now candidates, and Next/Later totals.
- The customer installer snapshot empties internal history-derived `intentFeatureMap` data.
- `check:intent-map` and `check:intent-map:customer` quickly validate developer/customer intent-map state and redaction.

## Non-Goals

- Preserving full raw chats
- Inspecting `_private/` or sensitive local files
- Exposing internal feature maps in customer snapshots
- Auto-executing roadmap candidates
