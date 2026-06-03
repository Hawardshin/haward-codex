# Evaluation: AgentCore Easy Agent Builder

날짜: 2026-06-04
요청 ID: UR-2026-06-04-009

## 결과

통과. AgentCore reference가 단순 문서나 입력 prefill에 머물지 않고, Agents 화면에서 `AgentCore Quick Builder`로 노출되며 선택한 blueprint가 native Agent Factory proposal 저장 흐름까지 이어진다.

## 구현 확인

- `buildAgentFactoryFormFromAgentCoreBlueprint`가 blueprint capability를 Agent Factory proposal form으로 변환한다.
- `createAgentFactoryProposal`은 optional form override를 받아 같은 native writer를 재사용한다.
- `createAgentCoreBlueprintProposal`은 선택한 blueprint를 적용하고 `create_agent_factory_proposal` 호출을 시작한다.
- `AgentCoreBlueprintPanel`은 `목적 선택`, `능력 추가`, `제안 생성`, `검증 준비` 단계를 보여준다.
- Browser preview는 native 저장 불가 상태를 표시한다.

## 검증 결과

- 통과: `corepack pnpm --filter workspace-monitor run check`
- 통과: `corepack pnpm --filter workspace-monitor test`
- 통과: `corepack pnpm --filter workspace-monitor run build:customer`
- 통과: `corepack pnpm --filter platform-desktop-app test`
- 통과: `corepack pnpm --filter platform-desktop-app run check`
- 통과: `cargo check` in `platform-desktop-app/src-tauri`
- 통과: product/user-flow/service-readiness/reference config contract checks
- 통과: Browser smoke, screenshot `outputs/agentcore-easy-builder-smoke.png`

## 재작업 사항

- 첫 platform test에서 `overflow-wrap: anywhere`가 한국어 버튼/라벨 줄바꿈 계약을 침해해 실패했다.
- `overflow-wrap: var(--text-natural-wrap)`로 수정했고 재검증을 통과했다.
- 첫 `cargo check`는 상위 폴더에서 실행해 `Cargo.toml`을 찾지 못했다. 실제 Tauri 폴더인 `platform-desktop-app/src-tauri`에서 다시 실행해 통과했다.

## 남은 리스크

- Public AWS AgentCore deploy readiness는 AWS 계정, Bedrock model access, AgentCore CLI setup에 따라 달라진다.
- 이번 slice는 local-first agent proposal 생성까지이며 public AWS deploy 완료 상태를 주장하지 않는다.
- Public desktop release는 여전히 signing, notarization, updater, clean-machine smoke가 막고 있다.

