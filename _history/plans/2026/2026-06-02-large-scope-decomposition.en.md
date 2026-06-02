# Plan Record: Large Scope Decomposition

- Date: 2026-06-02
- Request: `UR-2026-06-02-033`
- Requirement: `REQ-WS-073`
- Work mode: `governance`

## Goal

Add an operating structure for work whose scope or file set is too large, so agents create source inventory and slices before trying to read everything or implement directly.

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-02-large-scope-decomposition.en.md`
- Existing internal structure:
  - `_ops/workflows/52-parallel-work-planning.md`
  - `_ops/workflows/45-context-archive.md`
  - `agent-platform/configs/memory/bootstrap-manifest.json`
  - `agent-platform/configs/orchestration/agent-orchestration-registry.json`

## Execution Plan

1. Inspect overlap with existing parallel, context, and omission-prevention structure.
2. Design the new profile as a pre-gate rather than a parallel-execution replacement.
3. Add agent spec, docs, policy, workflow, and prompt.
4. Connect AGENTS, persistent instructions, start workflow, prompt router, and memory bootstrap.
5. Link requirements, specs, history, and evaluation.
6. Verify config, agent, memory, docs, naming, snapshot, omission, grounding, and evaluator.

## Decomposition Decision

- One implementation slice: add policy/config/docs.
- One connection slice: connect router/start workflow/persistent/memory.
- One close-out slice: add requirements, specs, history, evaluation, and validation.

This task edits shared files sequentially, so it should not run in parallel.
