# 요구사항 변경: 작업 모드 강제화

## 사용자 지시

- 작업 모드를 단순 프롬프트로 시키면 자유도는 올라가지만 강제되지 않는다.
- 설계가 탄탄해지려면 결국 강제화가 필요하다.

## 변경

- `REQ-WS-055`를 추가했다.
- 작업 모드는 prompt-only preference가 아니라 registry, CLI check, mode selection record, evaluator gate, evaluation report로 강제되는 실행 계약으로 정의했다.

## 영향 범위

- `agent-platform/configs/workflows/work-mode-registry.json`
- `agent-platform/src/agent_platform/work_modes.py`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `_ops/workflows/02-select-work-mode.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_docs/policies/work-mode-enforcement-policy.ko.md`

## 검증 기준

- `check-work-modes`가 registry와 evaluator policy drift를 잡아야 한다.
- `evaluate-work`가 non-`quick` 모드의 `mode_selection_record_targets` 누락을 blocking gap으로 반환해야 한다.
