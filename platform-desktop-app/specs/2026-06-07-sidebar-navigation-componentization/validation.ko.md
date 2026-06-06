# Validation: Sidebar Navigation Componentization

## 예정

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
- `corepack pnpm -w run desktop:renderer:build`
- `corepack pnpm --dir platform-desktop-app run check`

## 결과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm --dir platform-desktop-app test`: 통과, 30 tests
- Playwright smoke: 통과, activity rail DOM 렌더링 확인
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과
- `corepack pnpm -w run desktop:renderer:build`: 통과
- `corepack pnpm --dir platform-desktop-app run check`: 통과, 기존 public release gate 경고 유지
