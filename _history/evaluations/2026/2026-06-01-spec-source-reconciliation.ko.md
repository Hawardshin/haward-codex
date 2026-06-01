# 작업 평가: 스펙/소스 불일치 조정

## 결론

- 상태: `ready_to_close`
- 작업 모드: `standard`
- 관련 요청: `UR-2026-06-01-013`
- 관련 요구사항: `REQ-WS-030`
- 평가 입력: `_history/evaluations/2026/2026-06-01-spec-source-reconciliation-evaluation-input.json`
- grounding: `_history/evaluations/2026/2026-06-01-spec-source-reconciliation-grounding.json`

## 완료 요약

- `spec-reconciliation-agent`와 `reconcile-spec` CLI를 추가했다.
- 스펙/소스 비교 근거와 이슈 분류를 위한 `spec-reconciliation-template.json`을 추가했다.
- `clarification_needed` 알림 이벤트를 Slack/Discord/Teams 알림 설정에 추가했다.
- spec-driven workflow, prompt router, 지속 지시, memory bootstrap, 요구사항 기준선, 히스토리를 갱신했다.
- `ask_user` 이슈는 답변이 기록되기 전까지 관련 스펙/소스 변경을 막는 규칙으로 남겼다.

## 초기 지시 대비 평가

| 요청 내용 | 결과 |
| --- | --- |
| 스펙이 애매할 때 구체화 질문 필요 | `ambiguous_spec`과 `ask_user`를 `clarification_required`로 처리한다. |
| 스펙과 소스가 다를 때 어느 쪽을 고칠지 판단 | `update_spec`, `update_source`, `ask_user`, `defer` 분류를 추가했다. |
| 사용자가 답할 수 있는 알림 형식 | `clarification_needed` 이벤트 메시지에 질문 ID, 선택지, 추천, 답변 형식을 포함한다. |
| 미래에도 잊지 않는 구조 | AGENTS, persistent instructions, workflow, prompt router, memory bootstrap에 반영했다. |

## 검증

- `python3 -m unittest discover -s tests` from `agent-platform`: 103 tests passed.
- `reconcile-spec artifacts/spec-reconciliation/example-clarification-input.json`: `clarification_required`, `clarification_needed`, gaps 없음.
- `check-notifications configs/integrations/notification-channels.json`: `ready`.
- `notify ... --event clarification_needed --dry-run`: 기본 채널 비활성화로 `nothing_to_send`, 실패 없음.
- `check-config-contract ...`: `self_documenting`.
- `check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`.
- `structure_audit.py --check`: `clean`.
- `workspace-index`, `task-board`: map/board 갱신.
- `workspace-monitor` `npm run test`, `npm run check`, `npm run build`: 통과.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.

## 남은 개선

- `workspace-monitor`에서 열린 `clarification_needed` 질문을 모아 보여주는 패널은 별도 개선으로 `_ops/backlog/deferred-improvements.ko.md`에 남겼다.
