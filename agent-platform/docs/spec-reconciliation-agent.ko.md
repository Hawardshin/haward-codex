# spec-reconciliation-agent

## 목적

`spec-reconciliation-agent`는 프로젝트 스펙이 애매하거나 현재 소스와 다를 때, 스펙을 고칠지 소스를 고칠지 또는 사용자에게 물어볼지를 먼저 판정한다.

## 사용 시점

- 스펙의 acceptance criteria가 애매해 구현 선택지가 갈릴 때
- 스펙에는 A라고 되어 있지만 소스, 테스트, 산출물은 B처럼 동작할 때
- 현재 소스가 더 최신 의도인지, 아니면 구현 regression인지 판단이 어려울 때
- 사용자의 제품 의도, 우선순위, 호환성, UX trade-off가 필요한 때

## 입력

- `project`
- `request_summary`
- `spec_paths`
- `source_paths`
- `comparison_evidence`
- `issues`
- `notification_targets`
- `plan_history_targets`

## 판정 규칙

- `update_spec`: 현재 소스 동작이 의도된 최신 동작이고, 검증되었으며, 기존 스펙이 오래되었을 때
- `update_source`: 승인된 최신 스펙이 명확하고, 현재 소스가 누락이나 regression일 때
- `ask_user`: 제품 의도, acceptance criteria, 우선순위, 호환성, trade-off가 애매할 때
- `defer`: 현재 작업 범위 밖이지만 추적해야 할 때

## 질문 형식

사용자에게 묻는 질문은 답하기 쉬운 형태여야 한다.

```text
[WARNING] Spec clarification needed: <project>
Project: <project>
Request: <request summary>
Spec/source reconciliation needs your decision before continuing.
Questions:
- SSR-001: <issue summary>
  - Q1: <question>? Options: <A>, <B>, <defer>. Recommended: <A>.
Reply format:
Q1=<answer>
event=clarification_needed
project=<project>, question_ids=Q1
```

## 운영 규칙

- `ask_user` 이슈는 답변을 기록하기 전까지 스펙이나 소스를 바꾸지 않는다.
- 답변을 받으면 해당 답변을 스펙, 계획, 작업 목록, validation, traceability에 반영한다.
- 알림 채널을 쓰는 경우 `agent-platform/configs/integrations/notification-channels.json`의 `clarification_needed` 이벤트를 사용한다.
- 실제 webhook URL이나 token은 저장소에 저장하지 않는다.

## 주요 명령

```bash
PYTHONPATH=src python3 -m agent_platform.cli reconcile-spec configs/planning/spec-reconciliation-template.json
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event clarification_needed --title "Spec clarification needed" --message "Q1=<answer>" --severity warning --dry-run
```

## 관련 파일

- `agent-platform/configs/planning/spec-reconciliation-template.json`
- `agent-platform/src/agent_platform/planning/spec_reconciliation.py`
- `_ops/workflows/38-spec-source-reconciliation.md`
- `_ops/prompts/38-reconcile-spec-source.md`
