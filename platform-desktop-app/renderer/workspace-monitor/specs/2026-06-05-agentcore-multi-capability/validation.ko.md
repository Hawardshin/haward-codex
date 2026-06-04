# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build:customer`

## Browser smoke

- Agents 화면에서 `에이전트 세부 기능 열기` disclosure를 열었다.
- `[data-agentcore-capability]` 9개 표시 확인
- `[data-agentcore-select-all]` 클릭 후 selected capability 9개 확인
- `선택 능력으로 입력 채우기` 클릭 후 form에 `동시 capability bundle`, `browser_verification_lane`, `sandboxed_code_execution`, `action_policy_gate`, `evaluation_quality_gate` 반영 확인
- desktop/mobile 수평 overflow 0

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agentcore-bundle-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agentcore-bundle-mobile.png`
