# Web Search Record: Workspace Monitor Static Asset Path Bugfix

## Search Time

- Date: 2026-06-02
- Request: Find and fix bugs and functional issues.

## Queries

- `Next.js dynamic import named export ssr false App Router static export official docs`
- `Next.js static export public folder fetch JSON app router basePath official docs`
- `React useDeferredValue controlled input performance official docs`
- `Tauri v2 command invoke state Mutex Rust official docs`
- `Next.js static export output export assetPrefix docs`
- `Next.js assetPrefix documentation official`
- `MDN fetch URL object documentation`
- `Tauri frontendDist asset protocol static files docs`

## Sources Checked

- Next.js static export official docs: https://nextjs.org/docs/canary/pages/building-your-application/deploying/static-exports
- Next.js `assetPrefix` official docs: https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix
- MDN `Window.fetch()` official docs: https://developer.mozilla.org/docs/Web/API/Window/fetch
- Tauri asset protocol official docs: https://v2.tauri.app/security/asset-protocol/
- Stack Overflow/Reddit/community results were used only as adoption/risk discovery signals, not factual proof.

## Plan Impact

- Next.js static export depends on serving HTML/CSS/JS static assets correctly, so generated asset URLs must work in desktop/subpath contexts.
- Next.js `assetPrefix` affects `_next/static` JavaScript/CSS paths, so it was used to prevent absolute `/_next` regressions.
- MDN documents that `fetch()` accepts URL objects as resources, so the snapshot fetch was changed to a current-document-relative `URL`.
- Tauri asset protocol is not the same as regular `file://`; therefore Chromium `file://` JSON fetch failure is not treated as final Tauri failure and remains a separate smoke target.

## Uncertainty

- The real packaged WebView smoke could not run because the Rust/Tauri toolchain is not available.
- Snapshot JSON size itself is outside this bugfix scope.
