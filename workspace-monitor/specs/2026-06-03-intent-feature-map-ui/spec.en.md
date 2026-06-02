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

- The snapshot collector reads `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.ko.md` into an `intentFeatureMap` object.
- `intentFeatureMap` includes intent counts, theme counts, Now/Next/Later counts, feature themes, roadmap candidates, and source limitations.
- Workspace Monitor shows an `Intent Map` section in developer and superadmin views.
- Overview shows a compact panel with intent counts, themes, Now candidates, and Next/Later totals.
- The customer installer snapshot empties internal history-derived `intentFeatureMap` data.

## Non-Goals

- Preserving full raw chats
- Inspecting `_private/` or sensitive local files
- Exposing internal feature maps in customer snapshots
- Auto-executing roadmap candidates

