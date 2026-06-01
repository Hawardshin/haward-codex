# Agent And History Visualization Spec

## Goal

Make Workspace Monitor show which agents exist and how history is accumulating in a more visual way.

## Scope

- Collect agent definitions from `agent-platform/configs/agents/*.json`.
- Merge coordination runtime state and task links into the agent catalog.
- Add an agent inventory map, runtime/status bars, and task status lanes to the Agents section.
- Add history density and category distribution visuals to Overview and History.
- Keep the static snapshot and Vercel export architecture.

## Out Of Scope

- Real-time agent process tracing
- External observability backend integration
- New chart library installation
- Authentication or authorization

## Design Decision

- Language/runtime: keep existing Next.js/TypeScript/Node collector.
- Visualization style: CSS-based bars and density charts without new dependencies.
- Data sources: `agent-platform/configs/agents/`, `_ops/coordination/status.json`, and `_history/`.
- Maintainability reason: add only necessary data to the snapshot JSON and render it through plain React components.

## Evidence

- Grafana state timeline and annotations docs provide patterns for interpreting state and events over time.
- OpenTelemetry observability docs emphasize separating observable units such as traces, metrics, and logs.
- Datadog dashboard docs provide event timeline/overlay patterns in a dashboard context.
