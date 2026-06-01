# 조사 노트: 비차단 역질문

## 핵심 결론

AI 에이전트가 질문을 던진 뒤 답변이 없다는 이유로 모든 작업을 멈추는 것은 workflow 설계 문제다. 더 나은 구조는 질문을 특정 의사결정 의존성으로 격리하고, 독립적으로 가능한 작업은 계속 진행하는 것이다.

## 재사용 규칙

- `blocked_decision`: 답변 없이는 안전하게 결정할 수 없는 선택.
- `unblocked_work`: 답변과 무관하게 진행 가능한 조사, 초안, 비교, 검증, 문서화.
- `assumptions`: 답변 대기 중 사용한 기본값이나 가정.
- `resume_action`: 답변 수신 후 무엇을 비교하고 어디를 수정할지.

## 출처

- Elastic HITL workflows: https://www.elastic.co/docs/explore-analyze/workflows/authoring-techniques/human-in-the-loop
- GitHub issue dependencies: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies
- Zapier HITL statuses: https://help.zapier.com/hc/en-us/articles/38838306755981-Special-step-run-statuses-in-Human-in-the-Loop-actions
- Atlassian blocked issues: https://support.atlassian.com/jira-service-management-cloud/docs/mark-issues-as-blocked/

## 적용 범위

- AI 사용 gap coaching
- spec/source reconciliation
- 장기 에이전트 작업의 pending human decision 관리
- 병렬 작업의 dependency 표시

## 주의

이 규칙은 무조건 진행하라는 뜻이 아니다. 고위험, 되돌릴 수 없는, 사용자의 최종 선호가 핵심인 작업은 여전히 대기해야 한다.
