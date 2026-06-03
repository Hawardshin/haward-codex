# Request Trace: Responsive Button Design

## Request

- ID: `UR-2026-06-03-057`
- Summary: 디자인적 버튼 반응형 전반을 더 다듬으라는 요청.

## Outcome

- Added shared control tokens for button hit size, target size, radius, gap, padding, and active shift.
- Added global desktop app button target, focus-visible, active, hover, and text wrapping behavior.
- Normalized responsive behavior across titlebar, panel, settings, terminal, source, workspace, adapter, and quick action buttons.
- Fixed mobile terminal drawer layout so inner action buttons no longer sit outside the viewport.
- Added readiness regression checks for responsive button CSS tokens.

## Validation

- `git diff --check`: pass
- `corepack pnpm --filter workspace-monitor run check`: pass
- `corepack pnpm --filter workspace-monitor run build:customer`: pass
- `corepack pnpm --filter platform-desktop-app test`: pass
- `corepack pnpm --filter platform-desktop-app run check`: pass
- Browser smoke desktop/mobile/terminal drawer: pass

## Artifacts

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/specs/2026-06-03-responsive-button-design/`
- `outputs/browser-qa/platform-desktop-button-responsive-mobile.png`
- `outputs/browser-qa/platform-desktop-button-responsive-desktop.png`
