# Request Trace: AgentCore Easy Agent Builder

요청 ID: UR-2026-06-04-009
소유 프로젝트: `platform-desktop-app/`

## 요청

사용자가 AgentCore의 기술을 참고해서 에이전트를 손쉽게 만들 수 있게 하라고 지시했다.

## 해석

이전 AgentCore blueprint 기능은 선택한 template이 검색 에이전트와 Agent Factory 입력을 채우는 데까지 구현되어 있었다. 이번 요청은 그 다음 단계인 “선택한 blueprint로 agent proposal을 바로 생성”하는 UX를 요구한다.

## 산출물

- `buildAgentFactoryFormFromAgentCoreBlueprint`
- `createAgentFactoryProposal(formOverride)`
- `createAgentCoreBlueprintProposal`
- `AgentCore Quick Builder` UI
- `바로 에이전트 제안 생성` action
- Product/user-flow/reference/service readiness registry 갱신
- Requirements/spec/web-search/evaluation 기록

## 결과

Agents 화면에서 AgentCore-style blueprint를 선택하면 local-first runtime capability와 optional AgentCore adapter boundary가 포함된 Agent Factory proposal form으로 변환된다. 설치 앱에서는 `바로 에이전트 제안 생성`이 native `create_agent_factory_proposal` command를 호출해 app data에 proposal을 저장한다. 브라우저 preview에서는 native runtime이 없음을 상태로 표시한다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `cargo check` from `platform-desktop-app/src-tauri`
- `check-config-contract` for product/user-flow/service-readiness/reference registries
- Browser smoke screenshot: `outputs/agentcore-easy-builder-smoke.png`

