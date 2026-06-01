# 런타임 조사/설계 계획

## 요청

런타임/언어 방향을 정할 때 조사도 하고, 그런 과정을 설계해 달라는 요청.

## 작업 모드

- `governance`

## 근거

- ADR 자료: 중요한 architecture decision을 context와 consequence로 기록하는 방식.
- Thoughtworks lightweight ADR: evolutionary architecture에서 future maintainer와 oversight를 위한 결정 기록.
- Google Cloud architecture framework: architecture documentation이 future design decisions를 돕는다는 관점.

## 계획

1. `REQ-WS-052`를 추가한다.
2. language decision registry에 research/design process와 decision/prototype contract를 추가한다.
3. runtime language policy에 조사/설계 절차를 추가한다.
4. workflow, prompt, template을 만든다.
5. router와 index에서 찾을 수 있게 한다.
6. 기록, 평가, 검증 후 commit/push한다.
