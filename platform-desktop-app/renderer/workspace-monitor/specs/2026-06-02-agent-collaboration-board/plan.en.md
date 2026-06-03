# Plan: Agent Collaboration Board

## Work Mode

- `governance`

## Plan

1. Check multi-agent tracing/workflow UI patterns through web search.
2. Review the existing Workspace Monitor agent/task snapshot structure.
3. Generate `collaborationBoard` in the collector.
4. Update snapshot TypeScript types and collector tests.
5. Add collaboration lanes and an agent-task-project flow map to the Agents tab.
6. Update requirements, README, history, and evaluation records.
7. Verify with tests, type check, build, and evaluator.

## Decisions

- Real-time processing is future work.
- The current change shows current/recent coordination state from the static snapshot.
- Future multiple agents or parallel tasks will automatically appear in the same lane and flow UI.
