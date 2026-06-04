# AgentCore Multi-Capability 스펙

## 요구사항

- REQ-WM-048: AgentCore Quick Builder는 여러 capability를 동시에 선택하고 agent proposal 입력에 반영해야 한다.

## 사용자 결과

- 사용자는 AgentCore Quick Builder에서 Runtime, Memory, Gateway, Browser, Code Interpreter, Identity, Policy, Observability, Evaluations를 여러 개 선택한다.
- `전체 선택`을 누르면 9개 capability가 한 번에 선택된다.
- `선택 능력으로 입력 채우기`를 누르면 Agent proposal form에 local capability, guardrail, output contract가 반영된다.

## 비목표

- AWS AgentCore cloud resource 생성
- 실제 external connector 권한 부여
- runtime execution engine 변경
