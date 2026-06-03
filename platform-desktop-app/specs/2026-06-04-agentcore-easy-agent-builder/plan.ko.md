# Plan: AgentCore Easy Agent Builder

## 단계

1. AgentCore 공식 문서, AgentCore CLI, awslabs sample reference를 다시 확인한다.
2. 기존 blueprint prefill flow와 Agent Factory proposal command를 연결한다.
3. Quick Builder UI와 preview/native 상태 문구를 추가한다.
4. Product, user-flow, reference, service readiness registry를 갱신한다.
5. Type check, tests, readiness, browser smoke를 실행한다.

## 선택한 구조

- 새 native command를 만들지 않는다.
- `create_agent_factory_proposal`을 재사용한다.
- Blueprint-to-form 변환은 React component 외부 helper로 둔다.
- AWS deploy는 optional adapter로 유지한다.

