# 작업 모드 라우팅 검증

## 검증 계획

- `work_evaluator.py` 단위 테스트를 실행한다.
- 전체 `agent-platform` unittest를 실행한다.
- `work-mode-registry.json`과 core 설정 파일의 self-documenting contract를 확인한다.
- memory bootstrap manifest가 새 모드 registry를 anchor로 인식하는지 확인한다.
- coding research, research planning, knowledge skeptic, hallucination guard, work evaluator CLI를 실행한다.
- task board와 workspace index를 갱신한다.

## 현재 결과

- `PYTHONPATH=src python3 -m unittest tests/test_work_evaluator.py`: pass
- `PYTHONPATH=src python3 -m unittest discover -s tests`: pass, 72 tests
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ... configs/workflows/work-mode-registry.json ...`: pass, `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: pass, `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research /tmp/codex-work-mode-coding-research.json`: pass, `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /tmp/codex-work-mode-research-plan.json`: pass, `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /tmp/codex-work-mode-knowledge-validation.json`: pass, `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /tmp/codex-work-mode-grounding.json`: pass, `ready_to_publish`

## 주의

- 루트 `a.txt` 삭제 상태는 이번 작업 전부터 존재한 unrelated 변경이므로 stage하지 않는다.
