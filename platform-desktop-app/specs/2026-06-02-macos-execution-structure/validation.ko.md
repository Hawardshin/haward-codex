# macOS 실행 구조 검증 계획

## 실행할 검증

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

## 검증하지 않는 것

- `.app` 실제 실행
- DMG/ZIP/PKG 생성
- Apple signing/notarization

위 항목은 이번 작업의 구조 정의 범위를 넘어선다.

