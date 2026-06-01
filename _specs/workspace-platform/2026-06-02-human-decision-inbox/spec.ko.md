# 스펙: Human Decision Inbox

## 목적

`REQ-WS-048`을 반영해 사람의 답변이 필요한 항목을 한 곳에 모으고, 답변 대기 중에는 안전한 다른 작업을 계속하며, 답변이 오면 현재 작업을 checkpoint한 뒤 관련 작업만 재개한다.

## 요구사항

- `REQ-WS-048`

## 동작 원칙

- `blocked_decision`, `clarification_needed`, 승인, 선호 결정은 `_ops/coordination/human-decision-inbox.json`에 기록한다.
- 하나의 결정에는 하나의 안정적인 ID를 둔다.
- record는 질문, 답변 형식, 영향, 막힌 작업, 계속 가능한 작업, 가정, 알림 이벤트, interrupt policy, checkpoint requirement, resume action을 포함한다.
- 관련 질문은 사람이 한 번에 답할 수 있도록 묶는다.
- 답변 대기 중에는 안전한 `unblocked_work`를 계속한다.
- 답변 수신 시 현재 작업을 먼저 checkpoint한다.
- 우선순위가 높거나 리스크를 줄이는 답변은 즉시 interrupt/resume한다.
- 낮은 우선순위 또는 문서 정리성 답변은 다음 안전 지점에 예약할 수 있다.
- 상태 변경은 `decision_history`에 기록한다.

## 변경 대상

- 요구사항 기준선과 변경/검토 기록
- `_ops/coordination/human-decision-inbox.json`
- `_ops/coordination/human-decision-inbox.*.md`
- `_ops/workflows/61-human-decision-inbox.md`
- `_ops/prompts/91-human-decision-inbox.md`
- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `agent-platform/configs/integrations/notification-channels.json`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_docs/instructions/persistent-instructions.*.md`
- `AGENTS.md`
- `_ops/prompts/00-router.md`
- `_ops/index.md`
- 히스토리, 조사, 평가, 타이밍 기록

## 수용 기준

- 중앙 inbox JSON은 self-documenting config 필드를 포함하고 JSON 검증을 통과한다.
- workflow/prompt는 decision 등록, batching, unblocked work, checkpoint, interrupt/resume, decision history 갱신을 요구한다.
- notification config는 `human_decision_needed`, `human_decision_answered`, `resume_ready` 이벤트를 노출한다.
- memory bootstrap과 persistent instructions에서 이 inbox를 발견할 수 있다.
- config contract, memory bootstrap, docs/naming/structure audit, grounding, evaluator, work timer가 통과한다.
