# Spec: AgentCore Easy Agent Builder

## 목표

AgentCore reference를 사용자가 이해하기 쉬운 데스크톱 agent creation flow로 바꾼다. 사용자는 runtime, memory, gateway/tool, evaluation-guarded blueprint 중 하나를 고르고, 같은 패널에서 Agent Factory proposal 생성을 시작할 수 있어야 한다.

## 구현 계약

- `AgentCoreBlueprintPanel`은 `AgentCore Quick Builder` 단계 표시를 가진다.
- 단계는 `목적 선택`, `능력 추가`, `제안 생성`, `검증 준비`로 보인다.
- 선택한 blueprint는 `buildAgentFactoryFormFromAgentCoreBlueprint`를 통해 Agent Factory form으로 변환된다.
- `바로 에이전트 제안 생성`은 선택한 blueprint를 기반으로 `createAgentCoreBlueprintProposal`을 호출한다.
- `createAgentCoreBlueprintProposal`은 기존 native command `create_agent_factory_proposal`을 재사용한다.
- 브라우저 preview에서는 native 저장 불가 상태를 표시한다.
- 설치 앱에서는 proposal이 app data의 Agent Factory proposal record로 저장된다.

## 데이터 계약

- Proposal form은 `agentId`, `label`, `goal`, `role`, `tools`, `guardrails`, `validationCommands`, `outputContract`, `ownerProject`, `targetPath`, `rollbackPlan`을 유지한다.
- `tools`에는 blueprint capabilities, `local_python_agent_runtime`, `local_process_execution`, local task-run store가 포함된다.
- `guardrails`에는 blueprint safety gates, 로컬 실행 경계, remote tool connector 경계, optional AgentCore adapter boundary가 포함된다.

## 출처 경계

- AWS AgentCore 공식 문서와 `awslabs/agentcore-samples`는 architecture/capability reference로만 사용한다.
- 원본 소스는 복사하지 않는다.
- AWS AgentCore CLI와 AWS credentials는 optional deployment adapter로 둔다.
- Lambda/cloud function/API는 필요할 때 tool connector로만 다루며, agent/Python 실행 호스트가 아니다.
