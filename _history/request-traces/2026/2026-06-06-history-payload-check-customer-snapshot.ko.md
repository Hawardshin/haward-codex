# 요청 결과 추적: History Payload Check Customer Snapshot

- 날짜: 2026-06-06
- 요청: 오류 해결.
- 재현:
  - `corepack pnpm run desktop:renderer:build`: 통과.
  - 직후 `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 기존 오류 재현.
  - 오류: `Admin history index must mark records as migrated_to_lazy_admin_index.`
- 결과:
  - `collect-workspace.mjs`가 developer admin index를 `src/generated/admin-history-index.json`에 별도 생성.
  - `check-history-payload.mjs`가 developer 원본과 public 산출물 모드를 분리 검증.
  - customer build 직후 check와 developer collect 직후 check 모두 통과.
- 주요 산출물:
  - `platform-desktop-app/renderer/workspace-monitor/scripts/check-history-payload.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/src/generated/admin-history-index.json`
