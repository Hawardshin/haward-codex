# 비차단 역질문 요구사항 변경

## 변경 개요

- 날짜: 2026-06-02
- 출처 요청: `UR-2026-06-02-001`
- 추가 요구사항: `REQ-WS-047`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 질문에 답하지 않으면 AI가 다른 모든 작업을 멈추는 문제가 있으며, 이것이 AI 시대의 큰 병목이라고 지적했다.

## 변경 내용

`REQ-WS-047`을 추가해 사용자 답변 대기 상태를 전체 작업 중단으로 처리하지 않도록 기준선화한다.

- 답변 없이는 결정할 수 없는 항목만 `blocked_decision`으로 격리한다.
- 조사, 출처 수집, 대안 비교, 초안, 테스트, 검증, 문서화, 리스크 정리처럼 답변과 독립적인 작업은 `unblocked_work`로 계속 진행한다.
- 진행 중 사용한 가정과 기본값을 명시한다.
- 답변 수신 후 어떤 파일이나 결정만 병합/수정할지 `resume_action`으로 기록한다.
- 되돌리기 어렵거나 위험한 작업은 보류한다.

## 근거

- Elastic의 human-in-the-loop workflow 문서는 human review를 critical decision point에 두는 패턴을 설명한다.
- GitHub issue dependency 문서는 막힌 작업과 막는 작업의 관계를 명시해 병목을 볼 수 있게 한다.
- Zapier human-in-the-loop 상태 문서는 일부 HITL 단계가 대기하는 동안 나머지 workflow step이 계속 실행될 수 있는 패턴을 보여준다.
- 기존 `REQ-WS-046`은 질문을 제한하고 수렴하는 규칙을 만들었지만, 답변 대기가 전체 작업을 멈추지 않도록 lane을 나누는 규칙은 충분히 명시하지 않았다.

## 영향

- `ai-usage-gap-profile.json`에 `global_pause_on_clarification`, `non_blocking_progress`, `non_blocking_clarification_policy`를 추가한다.
- `_ops/workflows/59-bridge-ai-usage-gap.md`와 `_ops/prompts/89-bridge-ai-usage-gap.md`는 pending answer를 `blocked_decision`과 `unblocked_work`로 분리한다.
- persistent instructions, AGENTS, memory bootstrap, spec reconciliation workflow는 같은 비차단 원칙을 참조한다.
