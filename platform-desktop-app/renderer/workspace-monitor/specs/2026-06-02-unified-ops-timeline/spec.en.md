# Spec: Unified Ops Timeline

## Goal

Workspace Monitor combines the existing date-indexed history, evaluations, web searches, work timings, request traces, collaboration tasks, blockers, and next actions into one operating event stream.

## Requirements

- `REQ-WM-018`
- Related request: `UR-2026-06-02-060`

## Behavior

- The collector preserves `documents`, `historyDays`, `tasks`, and `collaborationBoard` while adding `unifiedOps`.
- `unifiedOps.events` includes `sourceType`, `signalType`, `lane`, `severity`, `status`, `title`, `detail`, `path`, `category`, `language`, `date`, and `timestamp`.
- `unifiedOps.summary` exposes total/history/monitor/evidence/decision/open/critical signal counts plus the latest event time.
- Overview shows history and monitoring signals together in a `Unified Ops` panel.
- The History tab exposes the same unified stream above date-indexed history, connecting existing records with operational monitoring.
- View mode and language mode apply to unified events. Monitoring events are not hidden only because they have no document language.

## Non-Scope

- Real-time server telemetry backend
- OpenTelemetry SDK adoption
- External observability SaaS integration
- Removing the existing History/Agents/Desktop drill-down views
