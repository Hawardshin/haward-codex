# 검증: CLI 어댑터 경계

## 검증 계획

- `python3 -m json.tool agent-platform/configs/integrations/cli-adapter-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-adapter-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py` 및 `--check`
- `python3 _tools/task-board/src/task_board.py` 및 `--check`
- `npm run collect` from `workspace-monitor`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-cli-adapter-boundary-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-cli-adapter-boundary-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-cli-adapter-boundary.json`
- `git diff --check`

## 결과

- `python3 -m json.tool` 대상 JSON 파일 6개 통과.
- CLI adapter registry, memory bootstrap manifest, desktop distribution registry의 self-documenting config contract 통과.
- 확장 core config contract 통과.
- memory bootstrap check 통과: `ready_to_bootstrap`, `requires_rework=false`.
- docs audit 통과: `docs_ready`, `requires_rework=false`.
- naming audit 통과: `clean`, `requires_rework=false`.
- structure audit 통과: `clean`, `requires_rework=false`. 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 생성 폴더 경고는 남아 있으나 차단 항목은 아니다.
- workspace index 생성 및 `--check` 통과.
- task board 생성 및 `--check` 통과.
- `workspace-monitor` snapshot 수집 통과: 1200개 문서 기록.
- grounding check 통과: `ready_to_publish`, `requires_rework=false`.
- work evaluation 통과: `ready_to_close`, `requires_rework=false`.
- work timing check 통과.
- `git diff --check` 통과.
