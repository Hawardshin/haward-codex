# 검증 계획

## 필수 검증

- `cd agent-platform && python3 -m unittest discover -s tests`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline configs/integrations/cli-pipeline-template.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-pipeline-template.json configs/integrations/cli-adapter-registry.json configs/workflows/work-mode-registry.json configs/memory/bootstrap-manifest.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-cli-pipeline-file-artifact-handoffs.json`

## 수용 기준

- artifact handoff가 있는 template이 `pipeline_ready`를 반환한다.
- unsafe path, missing artifact id, unknown producer는 테스트에서 재작업으로 판정된다.
- 평가 입력은 `cli_pipeline_occurred=true`, `resource_risk_occurred=true`, `omission_check_targets`, `mode_selection_record_targets`를 포함한다.
