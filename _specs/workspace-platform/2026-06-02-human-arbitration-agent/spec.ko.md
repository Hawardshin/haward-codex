# Spec: Human Arbitration Agent

## 요구사항

- `REQ-WS-068`

## 문제

AI 에이전트가 여러 근거 있는 옵션을 만났을 때, 실제로는 사람의 가치판단이 필요한데도 확률적으로 그럴듯한 결론을 내릴 수 있다. 이는 플랫폼의 인간 최종 권한, 근거 기반 판단, 비차단 작업 진행 원칙과 맞지 않는다.

## 목표

`human-arbitration-agent`를 추가해 다음을 강제한다.

- 사실 불확실성과 가치판단 충돌 분리
- 양쪽이 모두 방어 가능할 때 human arbitration packet 생성
- `_ops/coordination/human-decision-inbox.json`에 판단 항목 등록
- 답변 대기 중 affected branch만 멈추고 안전한 작업은 계속

## 산출물

- agent spec: `agent-platform/configs/agents/human-arbitration-agent.json`
- agent docs: `agent-platform/docs/human-arbitration-agent.*.md`
- persistent instructions: `AGENTS.md`, `_docs/instructions/persistent-instructions.*.md`
- requirement and history records

## 수용 기준

- agent inspection이 통과한다.
- agent list에 표시된다.
- orchestration registry check가 통과한다.
- requirements/spec/history/evaluation trace가 연결된다.
- grounding과 omission check가 통과한다.
