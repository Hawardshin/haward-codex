# 스펙/소스 불일치 조정 스펙

## 목적

프로젝트 스펙이 애매하거나 현재 소스, 테스트, 생성 산출물과 다를 때 AI가 임의로 판단하지 않도록 한다. 변경 전 비교 근거를 기록하고, 스펙을 고칠지 소스를 고칠지 사용자에게 질문할지 분류한다.

## 요구사항

- 관련 요구사항: `REQ-WS-030`
- 관련 요청: `UR-2026-06-01-013`

## 범위

- `agent-platform`에 `spec-reconciliation-agent` 설정과 `reconcile-spec` CLI를 둔다.
- 알림 설정은 `clarification_needed` 이벤트를 지원한다.
- 운영 워크플로와 프롬프트 라우터는 스펙 애매함/스펙-소스 불일치 상황을 새 조정 workflow로 보낸다.
- 메모리 부트스트랩은 이 규칙을 미래 세션의 warm anchor로 유지한다.

## 동작 규칙

1. 스펙, 소스, 테스트, 생성 산출물, 기존 요구사항에서 비교 근거를 먼저 모은다.
2. 각 이슈를 `update_spec`, `update_source`, `ask_user`, `defer` 중 하나로 분류한다.
3. `update_spec`은 현재 구현이 최신 사용자 의도나 검증된 동작과 맞고 스펙이 낡았을 때만 사용한다.
4. `update_source`는 활성 스펙이 명확하고 소스가 회귀나 미구현일 때 사용한다.
5. `ask_user`는 제품 의도, 우선순위, acceptance criteria, 호환성, trade-off가 불명확할 때 사용한다.
6. `ask_user` 이슈는 안정적인 질문 ID, 선택지, 답변 형식, 결정 영향을 포함한다.
7. `ask_user` 이슈는 답변이 기록되기 전까지 해당 스펙이나 소스 변경을 중단한다.

## 산출물

- `agent-platform/src/agent_platform/planning/spec_reconciliation.py`
- `agent-platform/configs/planning/spec-reconciliation-template.json`
- `agent-platform/configs/agents/spec-reconciliation-agent.json`
- `_ops/workflows/38-spec-source-reconciliation.md`
- `_ops/prompts/38-reconcile-spec-source.md`
- `agent-platform/configs/integrations/notification-channels.json`

## 수용 기준

- `reconcile-spec`는 근거가 부족하면 `rework_required`를 반환한다.
- `ask_user` 또는 `ambiguous_spec` 이슈가 있으면 `clarification_required`와 `notification_event.event_type=clarification_needed`를 반환한다.
- 명확한 `update_source` 또는 `update_spec` 후보만 있으면 `ready_to_reconcile`을 반환한다.
- 알림 메시지는 사용자가 그대로 답할 수 있는 `answer_format`을 포함한다.
- 단위 테스트와 config/memory 검증을 통과한다.
