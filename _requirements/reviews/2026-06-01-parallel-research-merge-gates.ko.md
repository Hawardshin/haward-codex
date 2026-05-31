# 요구사항 검토: 병렬 조사 merge gate

## 검토 대상

- `REQ-WS-024`

## 적합성

- 사용자 요청은 조사 자체는 병렬로 가능하지만, 결과를 합치는 구조가 필요하다는 의미다.
- 기존 `REQ-WS-023`은 병렬 lane과 충돌 제어를 다뤘지만, 여러 조사 lane의 fan-in release 기준은 명시하지 않았다.

## 결정

- `REQ-WS-024`를 새 요구사항으로 추가한다.
- 병렬 조사 lane이 2개 이상 같은 batch에 있으면 merge gate가 필요하다.
- merge gate acceptance check가 통과하기 전에는 downstream 구현을 시작하지 않는다.

## 위험

- merge gate가 너무 무거우면 빠른 작업 속도를 줄일 수 있다. 단일 조사 lane이나 작은 quick 작업에는 강제하지 않는다.
