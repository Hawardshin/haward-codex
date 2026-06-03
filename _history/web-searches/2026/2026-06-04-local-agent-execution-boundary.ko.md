# Web Search Record: Local Agent Execution Boundary

날짜: 2026-06-04

## 사용자 지시

AgentCore 참고 구조를 쓰더라도 Lambda가 아니라 실제 에이전트와 Python 실행은 로컬에서 일어난다는 점을 반영한다.

## 검색어

- `Amazon Bedrock AgentCore Runtime local development agent deploy Lambda gateway official docs`
- `AWS AgentCore gateway Lambda MCP tools local agent runtime official docs`
- `AWS AgentCore CLI dev local agent runtime deploy official GitHub`

## 확인한 출처

- `https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-get-started-cli.html`
  - 유형: AWS 공식 문서
  - 확인 내용: AgentCore CLI flow에는 local development/test 단계와 deploy 단계가 분리되어 있다.
- `https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html`
  - 유형: AWS 공식 문서
  - 확인 내용: AgentCore dev는 local server와 Python agent loop를 사용하고, deploy는 별도 managed runtime 단계다.
- `https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html`
  - 유형: AWS 공식 문서
  - 확인 내용: Gateway는 Lambda/OpenAPI 같은 backend를 tool로 감쌀 수 있지만, 이것은 우리 제품의 기본 agent execution host가 아니다.

## 계획 영향

- UI와 registry에서 Lambda를 에이전트 실행 위치처럼 보이게 하는 표현을 제거한다.
- Agent Factory proposal에는 `local_python_agent_runtime`과 `local_process_execution`을 포함한다.
- AWS AgentCore deploy, Lambda, cloud functions는 optional deployment/tool connector boundary로 유지한다.

