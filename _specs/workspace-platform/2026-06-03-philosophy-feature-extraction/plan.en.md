# Plan: Philosophy Feature Extraction Structure

## Work Mode

- `governance`: this changes philosophy, registries, validators, prompts/workflows, memory bootstrap, and monitor surfaces.

## Decomposition

| Slice | Work | Touch paths |
| --- | --- | --- |
| PHF-001 | Add philosophy feature extraction registry and checker | `agent-platform/configs/orchestration/`, `agent-platform/src/agent_platform/governance/`, `agent-platform/tests/` |
| PHF-002 | Add operational links | `_ops/prompts/`, `_ops/workflows/`, `agent-platform/configs/agents/`, `agent-platform/docs/` |
| PHF-003 | Link philosophy trace and memory bootstrap | `_philosophy/`, `agent-platform/configs/governance/`, `agent-platform/configs/memory/` |
| PHF-004 | Reflect in Workspace Monitor snapshot/UI | `workspace-monitor/scripts/`, `workspace-monitor/lib/`, `workspace-monitor/components/`, `workspace-monitor/app/`, `workspace-monitor/tests/` |
| PHF-005 | Requirements/spec/history/evaluation/validation | `_requirements/`, `_specs/`, `_history/` |

## Decisions

- Create the registry and checker before a separate candidate inbox.
- Leave queued candidate implementation out of scope and record it as future work.
- Strip internal feature candidates from customer snapshots.
