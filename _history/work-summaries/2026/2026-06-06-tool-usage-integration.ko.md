# Tool Usage Integration 작업 요약

날짜: 2026-06-06

## 완료

- Codex식 도구 사용 루프를 `tool-usage-integration-registry.json`로 구조화했다.
- Workspace Monitor collector와 snapshot 타입에 `toolUsageIntegration`을 추가했다.
- Tool Studio에 source-backed Agent Tool Playbook 리스트와 상세 패널을 추가했다.
- product feature registry의 Root Tool Management 자산과 검증 gate에 연결했다.
- collector, customer snapshot, UI static test를 추가했다.

## 검증

- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test` - 74개 통과
- `corepack pnpm --filter workspace-monitor run build`
- Playwright smoke - Tool Studio playbook 렌더링 통과
- `corepack pnpm run desktop:package:internal`

## 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
