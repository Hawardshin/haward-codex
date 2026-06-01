# Plan: Principle Guardian Agent

## 구현 순서

1. 웹 검색 기록과 연구 노트를 저장한다.
2. 요구사항 `REQ-WS-067`을 추가한다.
3. `agent-platform/configs/agents/principle-guardian-agent.json`을 만든다.
4. `agent-platform/docs/principle-guardian-agent.ko.md`와 `.en.md`를 만든다.
5. `AGENTS.md`, persistent instructions, `agent-platform/README.md`를 갱신한다.
6. 스펙 묶음과 request trace, work summary, timing record를 연결한다.
7. 검증 명령을 실행한다.
8. omission/grounding/evaluation을 저장한다.
9. 커밋하고 push한다.

## 위험

- 원칙 고수가 추상 문구로만 남을 수 있다.
- 강한 원칙 고수가 작업을 불필요하게 막는 방향으로 오해될 수 있다.

## 완화

- 원칙을 close-out gate와 rework trigger로 정의한다.
- 원칙 충돌 시 compliant alternative, human checkpoint, reversible path를 함께 제시한다.
