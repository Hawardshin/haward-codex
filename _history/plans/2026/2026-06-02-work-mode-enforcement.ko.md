# 계획 기록: 작업 모드 강제화

## 선택 모드

- `governance`

## 선택 이유

- 사용자 지시가 작업 모드의 미래 운영 규칙과 evaluator behavior를 바꾸는 durable platform change다.
- 모드가 프롬프트에만 남으면 강제되지 않는다는 문제를 해결해야 하므로, registry와 CLI, evaluator, 평가 보고서까지 연결해야 한다.

## 실행 계획

1. 웹 검색으로 policy-as-code, schema validation, guardrail enforcement 사례를 확인한다.
2. 현재 `work-mode-registry.json`과 `work_evaluator.py`의 강제 범위를 확인한다.
3. registry에 `mode_enforcement`와 mode-level enforcement fields를 추가한다.
4. `check-work-modes` CLI와 Python validator를 추가한다.
5. evaluator에 `mode_selection_record_targets`를 추가한다.
6. 요구사항, 스펙, 정책, workflow, persistent instructions, memory bootstrap, history, evaluation을 갱신한다.
7. 테스트와 설정 검증 후 commit/push 한다.

## 근거 파일

- `_history/web-searches/2026/2026-06-02-work-mode-enforcement.ko.md`
- `_research/topics/agent-operations/2026-06-02-work-mode-enforcement.ko.md`
- `_specs/workspace-platform/2026-06-02-work-mode-enforcement/plan.ko.md`
