# Plan: Positive Vision Agent

## 구현 순서

1. 웹 검색 기록과 연구 노트를 저장한다.
2. 요구사항 `REQ-WS-065`를 추가한다.
3. `agent-platform/configs/agents/positive-vision-agent.json`을 만든다.
4. `agent-platform/docs/positive-vision-agent.ko.md`와 `.en.md`를 만든다.
5. 스펙 묶음과 request trace, work summary, timing record를 연결한다.
6. 검증 명령을 실행한다.
7. omission/grounding/evaluation을 저장한다.
8. 커밋하고 push한다.

## 위험

- 긍정적 비전이 “무조건 된다”는 거짓 확신으로 흘러갈 수 있다.
- 낙관이 위험 공개와 반대 의견을 억누르는 방식으로 오용될 수 있다.

## 완화

- 에이전트 정책에 unsupported guarantee 금지, reality check, verification gate, human decision inbox 연결을 넣는다.
- 출력 계약에 agency, pathways, if-then, fallback을 강제한다.
