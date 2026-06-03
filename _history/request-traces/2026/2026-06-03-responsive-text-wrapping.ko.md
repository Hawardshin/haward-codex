# Request Trace: Responsive Text Wrapping

## Request

- ID: `UR-2026-06-03-058`
- Summary: 반응형 처리로 텍스트가 의도하지 않게 깨지는 케이스가 많다는 지적.

## Outcome

- Normal UI text wrapping is now separated from long-token wrapping.
- Buttons and generic button label children no longer use broad `overflow-wrap:anywhere`.
- `code`, `pre`, path/log/state values retain long-token overflow protection.
- Readiness and unit tests guard the policy.
- Browser QA confirms no target/wrapping/horizontal overflow issue on mobile, desktop, and terminal drawer surfaces.

## Artifacts

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-03-responsive-text-wrapping.ko.md`
- `platform-desktop-app/specs/2026-06-03-responsive-text-wrapping/`

## Validation

- `corepack pnpm --filter workspace-monitor run check`: pass
- `corepack pnpm --filter workspace-monitor run build:customer`: pass
- `corepack pnpm --filter platform-desktop-app test`: pass
- `corepack pnpm --filter platform-desktop-app run check`: pass
- `git diff --check`: pass
- Browser QA: pass
