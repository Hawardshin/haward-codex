# 요청-결과 추적: 작업 모드 강제화

## 요청 요약

- 모드를 프롬프트로만 시키면 강제되지 않으므로 설계를 탄탄하게 하려면 강제화해야 한다.

## 결과

- `REQ-WS-055` 추가.
- work-mode registry에 enforcement layer와 mode selection record requirement 추가.
- `check-work-modes`, `list-work-modes`, `show-work-mode` CLI 추가.
- evaluator가 non-`quick` 모드의 `mode_selection_record_targets` 누락을 blocking gap으로 처리하도록 변경.
- 정책, workflow, persistent instructions, memory bootstrap, history, evaluation 문서 반영.

## 주요 산출물

- `agent-platform/src/agent_platform/work_modes.py`
- `agent-platform/configs/workflows/work-mode-registry.json`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `_docs/policies/work-mode-enforcement-policy.ko.md`
- `_ops/workflows/02-select-work-mode.md`
- `_ops/workflows/40-evaluate-and-rework.md`

## 평가

- `_history/evaluations/2026/2026-06-02-work-mode-enforcement.ko.md`
