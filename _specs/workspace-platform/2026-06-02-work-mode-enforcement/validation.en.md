# Validation: Work Mode Enforcement

## Planned Checks

- `python3 -m json.tool agent-platform/configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input>`
- `python3 -m unittest discover -s tests` from `agent-platform`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `git diff --check`

## Results

- JSON syntax checks passed.
- `check-work-modes`: `ready`.
- `python3 -m unittest discover -s tests`: 118 tests passed.
- `check-config-contract`: all core shared settings were `self_documenting`.
- `check-memory-bootstrap`: `ready_to_bootstrap`.
- `docs-audit`: `docs_ready`.
- `naming-audit`: `clean`.
- `structure-audit`: `clean`. Existing generated-output classification warnings remain for `presentation-agent/playwright-report` and `presentation-agent/test-results`; they are not blocking for this change.
- Ran `workspace_index.py`, `task_board.py`, and `npm run collect` in `workspace-monitor`.
- `npm run collect` was accidentally run once from the repository root and failed because root has no `package.json`; rerunning it from `workspace-monitor/` passed.
- `check-grounding`: first run found an unsupported `json_schema` source type; after correction, rerun returned `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- `work_timer.py check`: `ready`; phase durations remain unmeasured because timing was recorded after the task began.
- `git diff --check` passed.
