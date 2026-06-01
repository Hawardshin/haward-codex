# Plan: Profit Analyst Agent

## 구현 순서

1. 웹 검색 기록과 연구 노트를 저장한다.
2. 요구사항 `REQ-WS-066`을 추가한다.
3. `agent-platform/configs/agents/profit-analyst-agent.json`을 만든다.
4. `agent-platform/docs/profit-analyst-agent.ko.md`와 `.en.md`를 만든다.
5. 스펙 묶음과 request trace, work summary, timing record를 연결한다.
6. 검증 명령을 실행한다.
7. omission/grounding/evaluation을 저장한다.
8. 커밋하고 push한다.

## 위험

- 돈 관점 판단이 단일 ROI 숫자나 과도한 확신으로 축소될 수 있다.
- 개인 투자·세무·법률·회계 조언으로 오해될 수 있다.
- 돈이 된다는 이유로 품질과 안전이 후순위가 될 수 있다.

## 완화

- 에이전트 정책에 assumptions, source provenance, scenario/sensitivity, professional review, human checkpoint를 넣는다.
- 출력 계약에 비금전 제약과 검증 게이트를 포함한다.
