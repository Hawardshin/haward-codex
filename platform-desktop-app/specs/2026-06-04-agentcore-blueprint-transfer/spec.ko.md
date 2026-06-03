# Spec: AgentCore Blueprint Transfer

## 목표

`awslabs/agentcore-samples`의 production-agent 구조를 현재 데스크톱 앱의 `Agents` 화면에서 선택, 적용, 검증 가능한 blueprint 기능으로 전환한다.

## 구현 계약

- `Agents` 화면에 `AgentCoreBlueprintPanel`을 추가한다.
- Blueprint는 최소 runtime, memory, gateway/tool, evaluation-guarded agent 유형을 제공한다.
- 각 blueprint는 lifecycle, capabilities, stored records, safety gates를 보여준다.
- `에이전트 생성 입력 채우기`는 `SearchAgentRunForm`과 `AgentFactoryForm`을 동시에 채운다.
- `배포 사전점검 작업 만들기`는 Search Agent Work Chat에 AgentCore-style production readiness 작업을 채운다.
- AWS AgentCore CLI와 AWS credentials는 optional deployment adapter로만 표현한다.
- Readiness/test/config registry가 이 기능을 강제한다.

## 출처 경계

- 공식 문서: `https://docs.aws.amazon.com/bedrock-agentcore/`
- 사용자 제공 repo: `https://github.com/awslabs/agentcore-samples`
- 라이선스: Apache-2.0
- 정책: 원본 소스 코드는 제품에 복사하지 않고, 구조/흐름만 clean-room 방식으로 이전한다.

