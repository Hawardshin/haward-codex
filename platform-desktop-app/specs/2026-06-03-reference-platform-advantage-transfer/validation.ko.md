# Validation

## 실행 결과

- `node platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs --best-effort`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run test`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- `corepack pnpm --filter workspace-monitor run check:intent-map`: 통과
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`: 통과
- `git diff --check`: 통과
- Browser smoke: desktop/mobile Overview에서 `.reference-advantage-board` 렌더링, card 6개, overflow 0건 확인
- Browser smoke screenshots:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/reference-advantage-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/reference-advantage-mobile.png`

## 현재 확인

- JSON parse 통과.
- developer snapshot 생성 통과.
- developer snapshot에 `referencePlatformAdvantages.summary.totalPatterns = 13` 확인.
- customer snapshot은 `publicReview.status=customer_snapshot_sanitized`, `referenceLinks.length=0`, `sourcePath=""` 확인.

## Close-out 기준

- 통과.
