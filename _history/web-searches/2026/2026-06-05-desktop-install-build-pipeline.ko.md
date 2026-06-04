# 2026-06-05 Desktop Install Build Pipeline Web Search

## Trigger

- 사용자 지시: 설치/빌드 방법 자체를 바꿔도 된다는 허용.
- 목적: Tauri, pnpm workspace filter, Playwright browser install, updater/notarization gate를 공식 문서 기준으로 확인한 뒤 로컬 pipeline을 조정한다.

## Queries

- `Tauri v2 build bundling official docs pnpm beforeBuildCommand beforeDevCommand`
- `pnpm recursive filter workspace scripts official docs`
- `Playwright install chromium only shell official docs CI`
- `site:pnpm.io filtering pnpm workspace --filter official docs`

## Checked Sources

- Tauri v2 configuration reference: https://v2.tauri.app/reference/config/
- Tauri updater plugin docs: https://v2.tauri.app/plugin/updater/
- Playwright browser install docs: https://playwright.dev/docs/browsers
- pnpm filtering docs: https://pnpm.io/filtering

## Decision Impact

- Tauri direct build should keep a `beforeBuildCommand` that prepares `frontendDist`.
- Internal package pipeline may override Tauri config to use a lighter prepared-renderer hook after the renderer has already been built and audited.
- pnpm workspace filters are appropriate for limiting setup to `platform-desktop-app` and `workspace-monitor` instead of reinstalling every workspace project.
- Playwright browser install belongs in setup, not in every verification or package build.

## Weak Or Unused Sources

- General blog/search snippets were ignored because official docs covered the needed command semantics.

## Uncertainty

- Public updater/signing/notarization work remains a release infrastructure task, not an install/build pipeline refactor. No public-ready claim was made.
