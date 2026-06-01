# 검증 기록

## 예정 검증

- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 -m unittest discover -s _tools/structure-audit/tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/assistant-runtimes/adapter-registry.json ../_ops/projects/root-structure-policy.json`
- core `check-config-contract`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `workspace-monitor` `npm test`
- `workspace-monitor` `npm run check`
- `workspace-monitor` `npm run build`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ...`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ...`
- `git diff --check`

## 결과

- `python3 -m json.tool _ops/assistant-runtimes/adapter-registry.json`: 통과.
- `python3 -m json.tool _ops/projects/root-structure-policy.json`: 통과.
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`: 통과.
- `python3 -m json.tool _ops/coordination/status.json`: 통과.
- `python3 -m unittest discover -s _tools/structure-audit/tests`: 통과. 7 tests.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: 통과. `clean`, gap/warning 없음, `.agents`, `.claude`, `.cursor`가 `runtime_adapter`로 분류됨.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/assistant-runtimes/adapter-registry.json ../_ops/projects/root-structure-policy.json`: 통과. `self_documenting`.
- core `check-config-contract`: 통과. bootstrap manifest, research/workflow/install configs, adapter registry gap 없음.
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: 통과. `ready_to_bootstrap`.
- `workspace-monitor` `npm test`: 통과. 4 tests.
- `workspace-monitor` `npm run check`: 통과.
- `workspace-monitor` `npm run build`: 통과. 600 documents snapshot으로 static build 성공.
- `python3 _tools/workspace-index/src/workspace_index.py`: 통과. maps 재생성.
- `python3 _tools/task-board/src/task_board.py`: 통과. coordination board 재생성.
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-tool-agnostic-agent-principles-grounding.json`: 통과. `ready_to_publish`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-tool-agnostic-agent-principles-evaluation-input.json`: 통과. `ready_to_close`.
- `git diff --check`: 통과.
