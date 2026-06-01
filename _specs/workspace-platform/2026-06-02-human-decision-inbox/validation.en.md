# Validation: Human Decision Inbox

## Planned Checks

- `python3 -m json.tool _ops/coordination/human-decision-inbox.json`
- `python3 -m json.tool agent-platform/configs/usage/ai-usage-gap-profile.json`
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `python3 -m json.tool agent-platform/configs/integrations/notification-channels.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/memory/bootstrap-manifest.json configs/integrations/notification-channels.json ../_ops/coordination/human-decision-inbox.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- Full core shared settings config contract
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py` and `--check`
- `python3 _tools/task-board/src/task_board.py` and `--check`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-human-decision-inbox-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-human-decision-inbox-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-human-decision-inbox.json`
- `git diff --check`

## Results

- JSON syntax: passed
- Config contract: passed
- Memory bootstrap: passed
- Docs audit: passed
- Naming audit: passed
- Structure audit: passed, with existing warnings for `presentation-agent/playwright-report` and `presentation-agent/test-results`
- Workspace index/task board freshness: passed
- Workspace health governance: passed
- Grounding check: `ready_to_publish`
- Work evaluator: `ready_to_close`
- Work timer: `ready`
- `git diff --check`: passed
