# 계획 기록: Human Decision Inbox

## 목표

사람의 답변이 필요한 항목을 한 곳에 모으고, 답변 대기 중에는 다른 안전한 작업을 계속하며, 답변이 오면 현재 작업을 checkpoint하고 관련 작업을 interrupt/resume하는 운영 구조를 만든다.

## 실행 계획

1. 웹 검색으로 HITL, workflow human task, blocked dependency, interrupt/resume 자료를 확인한다.
2. `REQ-WS-048`을 요구사항 기준선에 추가한다.
3. 중앙 inbox JSON과 설명 문서를 만든다.
4. workflow/prompt를 추가해 future agent가 같은 절차를 따르게 한다.
5. AI usage gap profile, notification config, persistent instructions, `AGENTS.md`, memory bootstrap, router, index를 연결한다.
6. history, research, trace, work summary, evaluation, timing을 남긴다.
7. coordination board와 workspace map을 갱신한다.
8. 검증 후 커밋하고 push한다.

## 의사결정

- 별도 프로젝트가 아니라 `_ops/coordination`의 공통 운영 구조로 둔다.
- 실제 runtime scheduler는 이번 범위에서 만들지 않고, 우선 source-of-truth config와 workflow/prompt 계약을 만든다.
- 답변 수신 후 바로 interrupt하는 경우와 다음 안전 지점에 예약하는 경우를 분리한다.

## 관련 산출물

- `_ops/coordination/human-decision-inbox.json`
- `_ops/workflows/61-human-decision-inbox.md`
- `_ops/prompts/91-human-decision-inbox.md`
- `_specs/workspace-platform/2026-06-02-human-decision-inbox/`
