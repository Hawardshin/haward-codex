# Tool Usage Integration 추적성

## 요구사항 연결

- REQ-TUI-001 -> `platform-desktop-app/configs/tool-usage-integration-registry.json`
- REQ-TUI-002 -> `platform-desktop-app/renderer/workspace-monitor/scripts/lib/tool-usage-integration.mjs`
- REQ-TUI-003 -> `ToolStudioPanel.tsx`, `globals.css`
- REQ-TUI-004 -> `buildCustomerSnapshot`, `collector.test.mjs`
- REQ-TUI-005 -> `platform-desktop-app/configs/product-feature-registry.json`

## 검증 연결

- Collector contract: `collector.test.mjs`
- UI contract: `tool-studio.test.mjs`
- TypeScript/check scripts: `pnpm --filter workspace-monitor run check`
- Build/package: final validation record

## 롤백

1. `toolUsageIntegration` snapshot field and collector import 제거
2. Tool Studio playbook UI 제거
3. registry file 제거
4. generated snapshots 재생성
5. tests에서 관련 계약 제거 후 `check`, `test`, `build` 실행
