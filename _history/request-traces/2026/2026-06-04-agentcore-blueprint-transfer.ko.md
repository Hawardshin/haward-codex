# Request Trace: AgentCore Blueprint Transfer

요청 ID: UR-2026-06-04-008
소유 프로젝트: `platform-desktop-app/`

## 요청

사용자가 `awslabs/agentcore-samples` 링크를 제공했다. 이전 맥락상 단순 참고가 아니라, 좋은 오픈소스/공식 agent platform 구조를 현재 데스크톱 앱에 실제 기능으로 녹이라는 요구로 해석했다.

## 산출물

- `AgentCoreBlueprintPanel`
- `agentCoreBlueprints`
- `applyAgentCoreBlueprint`
- Product/user-flow/reference/service readiness registry 갱신
- Readiness script/test 갱신
- Requirements/spec/history 기록

## 결과

Agents 화면에서 AgentCore-style production blueprint를 선택하고, 그 blueprint가 검색 에이전트 실행 입력과 Agent Factory 생성 입력을 실제로 채우도록 구현했다.

