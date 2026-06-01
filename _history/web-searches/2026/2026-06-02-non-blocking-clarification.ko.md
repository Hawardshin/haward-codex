# 웹 검색 기록: 비차단 역질문

## 요청 요약

사용자는 질문에 답하지 않으면 AI가 다른 모든 작업을 멈추는 문제가 있으며, 이것이 AI 시대의 큰 병목이라고 지적했다.

## 검색일

- 2026-06-02

## 검색어

- `human in the loop workflow avoid blocking entire process pending user input async decision gates`
- `workflow management blocked task dependencies continue unaffected tasks pending approval`
- `software project management dependency blocked tasks continue independent work WIP bottleneck`
- `AI agent human in the loop asynchronous clarification continue non-blocking work`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| Elastic, Human-in-the-loop workflows, https://www.elastic.co/docs/explore-analyze/workflows/authoring-techniques/human-in-the-loop | 공식 문서 | Human review를 critical decision point에 배치하고, 검토 대상 정보를 구조화하는 HITL 패턴을 설명한다. | 질문을 전체 정지가 아니라 decision point로 격리 |
| GitHub Docs, Creating issue dependencies, https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies | 공식 문서 | issue 간 `blocked by`와 `blocking` 관계를 명시해 병목과 의존성을 볼 수 있게 한다. | `blocked_decision`을 명시적 dependency record로 설계 |
| Zapier Help, Special step run statuses in Human in the Loop actions, https://help.zapier.com/hc/en-us/articles/38838306755981-Special-step-run-statuses-in-Human-in-the-Loop-actions | 공식 문서 | 일부 HITL 상태에서 나머지 workflow step이 계속 실행될 수 있음을 설명한다. | `unblocked_work` continuation을 정책에 반영 |
| Atlassian Jira Service Management, Mark issues as blocked, https://support.atlassian.com/jira-service-management-cloud/docs/mark-issues-as-blocked/ | 공식 문서 | blocker 표시로 해결이 필요한 일을 드러내는 운영 패턴을 제공한다. | 막힌 항목을 작고 명확하게 표시 |

## 제외하거나 약하게 본 출처

- 일반 블로그성 productivity 글은 실무 감각에는 도움되지만, 이번 정책의 핵심 근거로는 공식 문서와 툴 운영 문서를 우선했다.
- HITL 일반 설명만 있고 non-blocking continuation이나 dependency visibility가 없는 문서는 보조 근거로만 취급했다.

## 계획에 반영한 인사이트

- 질문 대기 상태는 workflow 전체 pause가 아니라 특정 decision point의 dependency로 모델링해야 한다.
- 막힌 항목을 `blocked_decision`으로 명시해야 병목이 보인다.
- 답변과 독립적인 일은 `unblocked_work`로 계속 진행하고, 가정과 `resume_action`을 기록해야 나중에 재작업 범위가 작아진다.

## 남은 불확실성

- 어떤 작업이 truly dependent인지 판단하는 기준은 도메인과 위험도에 따라 달라진다.
- 정책은 안전한 진행을 허용하지만, 되돌리기 어렵거나 고위험인 작업은 계속 보류해야 한다.
