# Plan: Agent Collaboration Board

## Request Summary

Workspace Monitor should show agents working with each other in the UI.

## Work Mode

- `governance`

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-02-agent-collaboration-board.en.md`
- Research note: `_research/topics/workspace-monitor/2026-06-02-agent-collaboration-board.en.md`
- Existing spec: `workspace-monitor/specs/2026-06-02-agent-history-visualization/`
- New spec: `workspace-monitor/specs/2026-06-02-agent-collaboration-board/`

## Plan

1. Build a collaboration snapshot by combining `status.json` agents/tasks with agent configs.
2. Add work lanes, agent-task-project flow, and workload strip to the Agents tab.
3. Make blockers and next actions visible in the UI.
4. Update snapshot types and collector tests.
5. Update requirements, history, evaluation, and verify with build.

## Decision

- Implement as a static snapshot UI now.
- Leave real-time tracing as future work.
