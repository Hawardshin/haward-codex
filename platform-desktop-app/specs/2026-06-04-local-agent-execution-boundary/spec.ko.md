# Spec: Local Agent Execution Boundary

## 목표

AgentCore-style blueprint가 원격 Lambda/cloud function 실행 중심으로 오해되지 않게 한다. 에이전트 loop와 Python 실행은 설치 앱의 로컬 process/runtime에서 시작하고, 원격 서비스는 필요 시 tool connector로만 붙는다.

## 구현 계약

- `Gateway Tool Agent` 설명에서 Lambda 실행 호스트 표현을 제거한다.
- AgentCore blueprint proposal helper는 `local_python_agent_runtime`과 `local_process_execution` capability를 포함한다.
- Guardrail은 로컬 실행, 원격 connector, optional AgentCore adapter를 구분한다.
- Product/user-flow/reference/service readiness registry는 local Python execution boundary를 명시한다.
- Readiness scripts는 local execution token 누락을 실패로 처리한다.

## 출처 경계

- AgentCore 공식 문서는 local dev와 managed deploy를 모두 설명한다.
- 우리 제품은 AgentCore managed deploy를 선택형 adapter로만 취급한다.
- Lambda/cloud function은 원격 도구 connector일 수 있지만 agent runtime host가 아니다.

