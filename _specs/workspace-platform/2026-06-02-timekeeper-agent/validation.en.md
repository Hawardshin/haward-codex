# Validation: Timekeeper Agent

## Required Checks

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/timekeeper-agent.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-timekeeper-agent.json`
- `cd agent-platform && PYTHONPATH=src python3 -m unittest discover -s tests`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --category projects --category tools`
- `cd workspace-monitor && npm run collect && npm test && npm run check && npm run build`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-timekeeper-agent-omission.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-timekeeper-agent-grounding.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-timekeeper-agent-evaluation-input.json`

## Acceptance Criteria

- All verification passes.
- `timekeeper-agent` appears in the agent list.
- The work-timer timing record is valid.
- Monitor snapshot/build remains valid.
- Omission, grounding, and evaluation results are close-out ready.
