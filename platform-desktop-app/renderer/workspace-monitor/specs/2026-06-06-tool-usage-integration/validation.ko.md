# Tool Usage Integration 검증

## 실행한 검증

- `corepack pnpm --filter workspace-monitor run collect` - 통과
- `corepack pnpm --filter workspace-monitor run check` - 통과
- `corepack pnpm --filter workspace-monitor test` - 통과, 74개 테스트
- `corepack pnpm --filter workspace-monitor run build`
- Playwright smoke: `data-tool-usage-playbook` 렌더링, playbook pattern 7개, validation 영역 확인
- `corepack pnpm run desktop:package:internal` - 통과
- package 후 `corepack pnpm --filter workspace-monitor run collect`로 developer snapshot 복구

## 주요 확인 지점

- `toolUsageIntegration` snapshot 필드 생성
- `data-tool-playbook-list`, `data-tool-usage-playbook` UI 계약 유지
- customer snapshot sanitizer가 내부 backlog target path 제거

## 패키징 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
