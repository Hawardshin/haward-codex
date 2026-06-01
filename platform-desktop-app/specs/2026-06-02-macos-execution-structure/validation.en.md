# macOS Execution Structure Validation Plan

## Checks To Run

- `python3 -m json.tool platform-desktop-app/configs/macos-execution-profile.json`
- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/macos-execution-profile.json ../platform-desktop-app/configs/desktop-distribution-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-macos-execution-structure.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions <input>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input>`

## Not Validated

- Actual `.app` launch
- DMG/ZIP/PKG generation
- Apple signing/notarization

Those items are outside this structural-definition task.

