# Validation: TypeScript file-size remediation

- 날짜: 2026-06-08

## 통과

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter platform-desktop-app run renderer:build`

## 줄 수 결과

- `SearchAgentWorkChatPanel.tsx`: 1235줄에서 485줄
- `ProviderAccountsPanel.tsx`: 664줄에서 487줄
- `useProviderAccountSettings.ts`: 700줄에서 481줄
- 새 하위 모듈: 모두 500줄 이하

## 남은 구조 압력

- `MonitorShell.tsx`: 13042줄
- `ToolStudioPanel.tsx`: 1738줄
- `lib/snapshot.ts`: 1331줄
- `types/desktop.ts`: 868줄

위 네 파일은 아직 구조적 pressure로 남아 있다. 이번 slice에서는 사용자-facing provider/search 실행 경계를 먼저 줄였고, 전체 legacy shell/source model 분리는 다음 안전한 refactor slice가 필요하다.
