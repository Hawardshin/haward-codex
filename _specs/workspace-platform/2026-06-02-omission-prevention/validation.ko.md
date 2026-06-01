# 검증 계획

## 자동 검증

- `python3 -m unittest discover -s tests` from `agent-platform/`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions configs/evaluation/omission-guard-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`

## 수동 검토

- `omission_check_targets`가 non-`quick` 모드 요구사항에 포함됐는지 확인한다.
- 누락 방지 정책과 워크플로가 한국어/영어 문서로 연결됐는지 확인한다.
