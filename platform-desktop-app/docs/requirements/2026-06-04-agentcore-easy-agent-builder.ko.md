# AgentCore Easy Agent Builder Requirements

날짜: 2026-06-04
소유 프로젝트: `platform-desktop-app/`

## 배경

사용자는 AgentCore의 기술을 참고해 에이전트를 쉽게 만들 수 있어야 한다고 요구했다. 이전 AgentCore blueprint transfer는 입력 prefill까지 구현했지만, 사용자는 매번 Agent Factory 필드를 수동으로 확인하고 저장해야 했다. 이번 요구는 AgentCore의 create/add/dev/deploy 사고방식을 데스크톱 앱의 한국어 우선 agent builder 흐름으로 바꾸는 것이다.

## 요구사항

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| REQ-PDA-092 | Agents 화면은 AgentCore-style blueprint를 쉬운 agent creation entry point로 제공해야 한다. | `AgentCore Quick Builder` 단계가 표시되고 사용자는 blueprint를 먼저 고를 수 있다. |
| REQ-PDA-093 | 선택한 blueprint는 Agent Factory proposal 저장까지 직접 이어져야 한다. | `바로 에이전트 제안 생성` 버튼이 native `create_agent_factory_proposal` command를 호출한다. |
| REQ-PDA-094 | Blueprint 기반 proposal은 runtime, memory, gateway/tool, evaluation 능력과 local-first runtime 경계를 포함해야 한다. | proposal form에는 blueprint capabilities, local task-run store, provider direct run, optional AgentCore adapter가 포함된다. |
| REQ-PDA-095 | 브라우저 미리보기와 설치 앱의 동작 차이는 사용자가 이해할 수 있어야 한다. | preview 상태는 native 저장 불가를 표시하고, 설치 앱에서는 같은 버튼이 app data에 저장한다고 설명한다. |
| REQ-PDA-096 | Readiness/test/registry는 quick builder가 빠지는 회귀를 잡아야 한다. | service readiness와 renderer readiness tokens가 `AgentCore Quick Builder`, `createAgentCoreBlueprintProposal`, `바로 에이전트 제안 생성`을 검증한다. |

## 비범위

- AgentCore CLI나 AWS credentials를 자동 설치하지 않는다.
- AWS AgentCore deploy를 필수 실행 경로로 만들지 않는다.
- awslabs 샘플 소스 코드를 제품에 복사하지 않는다.

