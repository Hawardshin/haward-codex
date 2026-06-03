# Request Trace: Local Agent Execution Boundary

요청 ID: UR-2026-06-04-010
소유 프로젝트: `platform-desktop-app/`

## 요청

사용자가 AgentCore 참고 구조에서 Lambda가 아니라 실제 에이전트와 Python 실행 위치가 로컬이라고 정정했다.

## 산출물

- `Gateway Tool Agent` UI 문구 수정
- `buildAgentFactoryFormFromAgentCoreBlueprint`에 `local_python_agent_runtime`, `local_process_execution` 추가
- Local execution guardrail 추가
- Product/user-flow/reference/service readiness registry 갱신
- Requirements/spec/web-search/history 기록

## 결과

AgentCore-style blueprint는 이제 로컬 Python/process runtime을 실행 호스트로 명시한다. Lambda, cloud function, remote API는 필요한 경우 도구 connector로만 다루며 agent runtime host로 표현하지 않는다.

