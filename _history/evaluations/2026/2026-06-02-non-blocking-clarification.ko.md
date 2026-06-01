# 작업 평가: 비차단 역질문

## 평가 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요구사항: `REQ-WS-047`
- 평가 입력: `_history/evaluations/2026/2026-06-02-non-blocking-clarification-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-02-non-blocking-clarification-grounding.json`

## 초기 지시 대비 결과

사용자는 질문에 답하지 않으면 AI가 전체 작업을 멈추는 단점이 있고, 이것이 AI 시대의 큰 병목이라고 지적했다.

반영 결과:

- `REQ-WS-047`으로 비차단 역질문 규칙을 기준선화했다.
- `ai-usage-gap-profile.json`에 `global_pause_on_clarification`, `non_blocking_progress`, `non_blocking_clarification_policy`를 추가했다.
- workflow와 prompt는 답변 대기를 `blocked_decision`, `unblocked_work`, `assumptions`, `resume_action`으로 나누도록 했다.
- persistent instructions, AGENTS, memory bootstrap, spec/source reconciliation workflow, spec-driven policy에 같은 규칙을 연결했다.

## 확인한 근거

- Elastic human-in-the-loop workflows
- GitHub issue dependencies
- Zapier human-in-the-loop statuses
- Atlassian blocked issue guidance

## 검증

- JSON syntax: 통과
- Config contract: 통과
- Memory bootstrap: 통과
- Docs audit: 통과
- Naming audit: 통과
- Structure audit: 통과, 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 경고는 유지
- Workspace index/task board freshness: 통과
- Workspace health governance: 통과
- Grounding check: `ready_to_publish`
- Work evaluator: `ready_to_close`
- Work timer: `ready`

## 남은 개선 후보

- 실제 작업 사례가 더 쌓이면 `blocked_decision`/`unblocked_work` 예시 prompt set을 추가한다.
- `resume_action` 없는 clarification 질문을 감지하는 작은 checker를 검토한다.
