# Local Agent Execution Boundary Requirements

날짜: 2026-06-04
소유 프로젝트: `platform-desktop-app/`

## 배경

사용자는 AgentCore 참고 구현에서 Lambda가 아니라 실제 에이전트와 Python 실행 위치가 로컬이라고 명확히 했다. 따라서 AgentCore gateway/tool 표현은 원격 함수 실행으로 보이면 안 되고, 로컬 데스크톱 runtime이 agent loop와 Python process를 실행한다는 제품 경계를 가져야 한다.

## 요구사항

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| REQ-PDA-097 | 에이전트 실행 호스트는 로컬 Python/process runtime이어야 한다. | AgentCore proposal에는 `local_python_agent_runtime`과 `local_process_execution` capability가 포함된다. |
| REQ-PDA-098 | Lambda/cloud function/API는 실행 호스트가 아니라 선택형 도구 connector로 표현해야 한다. | UI와 registry는 remote API/cloud function을 tool connector로만 설명한다. |
| REQ-PDA-099 | Readiness는 로컬 실행 경계가 누락되는 회귀를 잡아야 한다. | service readiness는 `local_python_agent_runtime`, `local_process_execution`, registry의 local Python execution 문구를 검증한다. |

## 비범위

- AWS AgentCore deploy를 기본 실행 경로로 만들지 않는다.
- Lambda를 에이전트 runtime host로 사용하지 않는다.
- 원격 API/tool connector 자체를 금지하지는 않는다.

