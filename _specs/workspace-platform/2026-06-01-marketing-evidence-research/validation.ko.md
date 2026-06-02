# 검증 기록

## 검증 계획

- `python3 -m json.tool agent-platform/configs/research/marketing-evidence-profile.json`
- `python3 -m json.tool agent-platform/configs/research/source-registry.json`
- `python3 -m json.tool agent-platform/configs/research/research-agent-profile.json`
- `python3 -m json.tool agent-platform/configs/research/source-discovery-registry.json`
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/research/marketing-evidence-profile.json`
- core `check-config-contract`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `workspace-monitor` `npm run build`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `check-grounding`
- `evaluate-work`
- `git diff --check`

## 결과

- `python3 -m json.tool agent-platform/configs/research/marketing-evidence-profile.json`: 통과.
- `python3 -m json.tool agent-platform/configs/research/source-registry.json`: 통과.
- `python3 -m json.tool agent-platform/configs/research/research-agent-profile.json`: 통과.
- `python3 -m json.tool agent-platform/configs/research/source-discovery-registry.json`: 통과.
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`: 통과.
- `python3 -m json.tool _ops/coordination/status.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/research/marketing-evidence-profile.json`: 통과. `self_documenting`.
- core `check-config-contract`: 통과. `self_documenting`, gap 없음.
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: 통과. `ready_to_bootstrap`.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: 통과. clean.
- `workspace-monitor` `npm run build`: 통과.
- `python3 _tools/workspace-index/src/workspace_index.py`: 통과. maps 재생성.
- `python3 _tools/task-board/src/task_board.py`: 통과. coordination board 재생성.
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-marketing-evidence-research-grounding.json`: 통과. `ready_to_publish`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-marketing-evidence-research-evaluation-input.json`: 통과. `ready_to_close`.
