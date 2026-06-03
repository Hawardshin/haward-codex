# Web Search Record: AgentCore Easy Agent Builder

날짜: 2026-06-04

## 사용자 지시

AgentCore의 기술도 참고해서 사용자가 에이전트를 손쉽게 만들 수 있도록 구현한다.

## 검색어

- `Amazon Bedrock AgentCore create agent CLI add memory gateway evaluator official docs`
- `AWS AgentCore CLI create add memory identity evaluator gateway official GitHub`
- `Amazon Bedrock AgentCore SDK create agent runtime memory gateway evaluations documentation`

## 확인한 출처

- `https://docs.aws.amazon.com/bedrock-agentcore/`
  - 유형: AWS 공식 문서
  - 신뢰도: 높음
  - 확인 내용: Runtime, Memory, Gateway, Identity, Browser/Code tools, Observability, Evaluation, Policy가 AgentCore의 capability 축이다.
- `https://github.com/awslabs/agentcore-samples`
  - 유형: AWS Labs 공개 샘플 repo
  - 신뢰도: 높음
  - 확인 내용: AgentCore sample은 runtime, memory, gateway, identity, evaluation 등 capability별 예시와 production lifecycle을 제공한다.
- `https://github.com/aws/agentcore-cli`
  - 유형: AWS 공개 CLI repo
  - 신뢰도: 높음
  - 확인 내용: `create`, `dev`, `deploy`, `invoke`, `add`, `logs`, `traces`, `evals` 같은 lifecycle command가 에이전트 생성 UX의 기준점이 될 수 있다.

## 계획 영향

- AgentCore CLI를 앱 필수 runtime으로 설치하지 않고 optional deployment adapter로 둔다.
- AgentCore의 capability add 구조는 `runtime`, `memory`, `gateway/tool`, `evaluation` blueprint와 Agent Factory proposal fields로 전환한다.
- `create` 흐름은 기존 native `create_agent_factory_proposal` command를 사용해 app data에 저장한다.
- UI는 한국어 우선으로 `목적 선택 -> 능력 추가 -> 제안 생성 -> 검증 준비`의 짧은 desktop builder 단계로 표현한다.

## 불확실성

- 실제 AWS AgentCore deploy readiness는 사용자 AWS 계정, Bedrock model access, AWS credential 상태에 따라 달라진다.
- 이번 변경은 local-first agent proposal 생성까지이며, AWS public deploy 가능 상태를 주장하지 않는다.

