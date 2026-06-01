# 리소스 누수 방지 Validation

## 자동 검증

- `python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources configs/evaluation/resource-guard-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-resource-leak-prevention.json`

## 수동 검토

- resource check가 과도한 full-loop 강제가 아니라 조건부 gate인지 확인한다.
- 사용자 지시가 정책, workflow, prompt, evaluator, memory bootstrap에 모두 연결됐는지 확인한다.

## 종료 기준

- 검증 명령이 통과한다.
- evaluation report가 `ready_to_close`다.
- omission check와 resource check가 각각 ready 상태다.
