# 요구사항 변경: 질문 보류 성능

## 변경

- `PDA-UX-022` 추가: CLI 질문 보류와 active session polling은 bounded scan, overlap 방지, inbox throttle, session report 병합, idle elapsed bucket을 적용해야 한다.

## 이유

다중 CLI lane과 긴 terminal output이 누적되면 매 poll마다 전체 output scan과 React state 교체가 누적 비용을 만들 수 있다.

## 영향

- 질문 감지 CPU 비용에 상한을 둔다.
- 자동 polling 중복 호출을 줄인다.
- UI rerender churn을 줄인다.
