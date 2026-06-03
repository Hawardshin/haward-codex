# Validation: AgentCore Easy Agent Builder

## 필수 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `cd platform-desktop-app && cargo check`
- Browser smoke: Agents 화면에서 `AgentCore Quick Builder`, `바로 에이전트 제안 생성`, preview/native status가 보이는지 확인한다.
- `git diff --check`

## 수용 기준

- Quick Builder UI가 Agents 화면에 표시된다.
- 선택한 blueprint가 Agent Factory proposal form으로 변환된다.
- Direct proposal action은 native runtime이 있을 때 기존 `create_agent_factory_proposal` command를 호출한다.
- Preview runtime에서는 저장 불가 상태가 명확히 보인다.
- Readiness scripts가 quick builder token을 검증한다.

