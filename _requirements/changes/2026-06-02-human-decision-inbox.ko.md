# Human Decision Inbox 요구사항 변경

## 변경 개요

- 날짜: 2026-06-02
- 출처 요청: `UR-2026-06-02-002`
- 추가 요구사항: `REQ-WS-048`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 답변이 필요한 문제들을 한 번에 모으고, 사람이 돌아와 그 문제를 해결하면 현재 작업을 안전하게 인터럽트한 뒤 관련 작업을 다시 진행하는 구조를 요청했다. 사람이 답변하기 전까지는 다른 독립 작업을 계속해야 한다.

## 변경 내용

`REQ-WS-048`을 추가해 사람의 답변, 승인, 선호 결정, `blocked_decision`, `clarification_needed`를 중앙 human decision inbox에서 관리하도록 기준선화한다.

- 답변이 필요한 항목은 `_ops/coordination/human-decision-inbox.json`에 한 항목씩 등록한다.
- 각 항목은 질문, 답변 형식, 영향, 막힌 작업, 계속 가능한 작업, 알림 이벤트, 체크포인트 요구사항, 재개 방법을 포함한다.
- 관련 질문은 사람이 한 번에 답할 수 있도록 묶는다.
- 답변을 기다리는 동안 안전한 독립 작업은 계속한다.
- 답변이 오면 현재 작업의 touched paths, 검증 상태, 다음 안전 복귀 지점을 checkpoint한다.
- 우선순위와 위험도에 따라 즉시 interrupt/resume 하거나 다음 안전 지점에 재개를 예약한다.
- 상태 변경은 `decision_history`에 남긴다.

## 근거

- LangChain Human-in-the-Loop 문서는 interrupt를 통해 실행을 멈추고, checkpoint 상태에서 사람의 결정으로 resume하는 패턴을 설명한다.
- Microsoft Agent Framework AG-UI workflow 문서는 pending request와 interrupt ID 기반 resume payload를 다룬다.
- Conductor Human Task 문서는 workflow가 외부 human signal을 기다리는 human task 상태를 명시한다.
- GitHub issue dependencies 문서는 blocked-by/blocking 관계를 명시해 병목을 추적하는 방식을 제공한다.
- 기존 `REQ-WS-047`은 전체 작업 중단 금지를 다루지만, 답변 항목을 한 곳에 모아 answer/resume 상태를 추적하는 계약은 별도로 필요했다.

## 영향

- `_ops/coordination/human-decision-inbox.json`을 중앙 인박스로 추가한다.
- `_ops/workflows/61-human-decision-inbox.md`와 `_ops/prompts/91-human-decision-inbox.md`를 추가한다.
- AI usage gap profile, persistent instructions, `AGENTS.md`, notification channel config, memory bootstrap, router, ops index에 human decision inbox를 연결한다.
