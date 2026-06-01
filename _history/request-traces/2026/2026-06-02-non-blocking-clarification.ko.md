# 요청-결과 추적: 비차단 역질문

## 요청

- ID: `UR-2026-06-02-001`
- 요약: 질문 답변 대기 때문에 전체 작업이 멈추는 병목을 줄여야 한다.

## 결과

- `REQ-WS-047`을 추가했다.
- AI usage gap profile에 `global_pause_on_clarification`, `non_blocking_progress`, `non_blocking_clarification_policy`를 추가했다.
- workflow/prompt/운영 모델/지속 지시/AGENTS에서 `blocked_decision`, `unblocked_work`, `assumptions`, `resume_action`을 요구하도록 했다.
- spec/source reconciliation 경로에도 관련 spec/source만 대기하고 독립 작업은 계속하는 규칙을 넣었다.

## 산출물

- `_requirements/changes/2026-06-02-non-blocking-clarification.ko.md`
- `_requirements/reviews/2026-06-02-non-blocking-clarification.ko.md`
- `_specs/workspace-platform/2026-06-02-non-blocking-clarification/`
- `_history/web-searches/2026/2026-06-02-non-blocking-clarification.ko.md`
- `_research/topics/agent-planning/2026-06-02-non-blocking-clarification.ko.md`
- `_history/evaluations/2026/2026-06-02-non-blocking-clarification.ko.md`

## 평가

- 평가 입력: `_history/evaluations/2026/2026-06-02-non-blocking-clarification-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-02-non-blocking-clarification-grounding.json`

## 커밋

- 검증 후 기록한다.
