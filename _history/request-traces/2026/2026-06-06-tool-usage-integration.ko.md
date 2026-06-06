# Tool Usage Integration 요청 추적

날짜: 2026-06-06

## 요청

Codex가 현재 사용한 도구들과 사용 방식을 플랫폼에도 반영해 달라는 요청.

## 결과

구현 완료. Tool Studio가 Agent Tool Playbook을 표시하고, snapshot collector가 `toolUsageIntegration` 데이터를 공급한다.

## 주요 변경 파일

- `platform-desktop-app/configs/tool-usage-integration-registry.json`
- `platform-desktop-app/renderer/workspace-monitor/scripts/lib/tool-usage-integration.mjs`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/collector.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증

- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- Playwright smoke
- `corepack pnpm run desktop:package:internal`

## 산출물

- macOS app: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 후속 후보

Agent Tool Playbook 항목을 실제 task preset runner로 바꾸는 기능. 실행 전 approval, rollback, permission, secret boundary가 필요하다.
