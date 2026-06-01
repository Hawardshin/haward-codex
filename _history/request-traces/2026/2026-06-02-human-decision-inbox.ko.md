# 요청 추적: Human Decision Inbox

## 요청

- ID: `UR-2026-06-02-002`
- 요약: 답변이 필요한 문제를 한 번에 모으고, 사람이 답변하기 전까지 다른 일을 계속하며, 답변이 오면 interrupt/resume하는 구조를 요청했다.

## 요구사항

- `REQ-WS-048`

## 결과

- 중앙 inbox: `_ops/coordination/human-decision-inbox.json`
- 설명 문서: `_ops/coordination/human-decision-inbox.ko.md`
- workflow: `_ops/workflows/61-human-decision-inbox.md`
- prompt: `_ops/prompts/91-human-decision-inbox.md`
- 관련 설정: `agent-platform/configs/usage/ai-usage-gap-profile.json`, `agent-platform/configs/integrations/notification-channels.json`, `agent-platform/configs/memory/bootstrap-manifest.json`
- 스펙: `_specs/workspace-platform/2026-06-02-human-decision-inbox/`

## 검증

- 검증 결과는 `_specs/workspace-platform/2026-06-02-human-decision-inbox/validation.ko.md`와 `_history/evaluations/2026/2026-06-02-human-decision-inbox.ko.md`에 기록한다.

## 남은 개선 후보

- 반복 사용 사례가 쌓이면 inbox record를 생성/응답/재개 처리하는 작은 CLI를 검토한다.
- workspace-monitor에서 open decision을 시각화하는 패널을 추가할 수 있다.
