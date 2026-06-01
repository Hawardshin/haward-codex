# Agent/History Visualization Plan

## Work Mode

- `standard`

## Goal

Make Workspace Monitor show agent inventory and accumulated history more visually.

## Plan

1. Check official dashboard/observability references.
2. Inspect the existing snapshot collector and UI structure.
3. Collect agent configs into `agentCatalog` in the snapshot.
4. Add agent inventory map, runtime/status bars, and task status lanes to the Agents section.
5. Add date density and category bars to History/Overview.
6. Run test/check/collect/build and browser smoke check.
7. Record history, evaluation, trace, then commit/push.

## Selected Implementation

Extend the existing static snapshot plus React/CSS structure instead of adding a backend or chart library.
