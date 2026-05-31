# Memory Bootstrap Agent

`memory-bootstrap-agent` validates durable memory anchors so future AI sessions do not forget repository rules and settings.

## Purpose

- Do not rely on chat memory.
- Separate always-loaded hot context from warm/cold context that can be retrieved as needed.
- Record required documents and configs in `agent-platform/configs/memory/bootstrap-manifest.json`.
- Return `memory_bootstrap_required`, not `ready_to_bootstrap`, when a required file is missing or the startup sequence is broken.

## Memory Tiers

| Tier | Role |
| --- | --- |
| `hot` | Compact core rules and settings that should be loaded first in every new session |
| `warm` | Policies, workflows, and current history used depending on task type |
| `cold` | Maps, long history, and detailed docs retrieved when needed |

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

If the result is `ready_to_bootstrap`, read `hot_context_paths` before work. If the result is `memory_bootstrap_required`, resolve the listed `gaps` first.

## Related Files

- Manifest: `agent-platform/configs/memory/bootstrap-manifest.json`
- Agent config: `agent-platform/configs/agents/memory-bootstrap-agent.json`
- Python implementation: `agent-platform/src/agent_platform/memory/bootstrap.py`
- Operations prompt: `_ops/prompts/01-memory-bootstrap.md`
- Operations workflow: `_ops/workflows/01-memory-bootstrap.md`
