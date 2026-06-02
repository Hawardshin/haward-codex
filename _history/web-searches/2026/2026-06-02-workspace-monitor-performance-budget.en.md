# Web Search Record: Workspace Monitor Performance Budget

## Search Time

- Date: 2026-06-02
- Request: Analyze Workspace Monitor and related code broadly, improve speed, and keep it fast.

## Queries

- `Next.js App Router performance lazy loading dynamic imports official docs`
- `React useMemo useDeferredValue performance official docs`
- `Next.js bundle analyzer optimize package imports official docs`
- `Next.js optimizePackageImports next.config.js lucide-react docs nextjs.org`
- `Tauri v2 performance best practices official docs`

## Sources Checked

- Next.js lazy loading official docs: https://nextjs.org/docs/app/guides/lazy-loading
- Next.js `optimizePackageImports` official docs: https://nextjs.org/docs/pages/api-reference/config/next-config-js/optimizePackageImports
- React `useDeferredValue` official docs: https://react.dev/reference/react/useDeferredValue
- Tauri process model official docs: https://v2.tauri.app/concept/process-model/
- Reddit/community signals: Next.js performance discussions were used only as adoption/risk discovery signals, not factual proof.

## Plan Impact

- Next.js official docs describe Client Component and library lazy loading as a way to reduce initial JavaScript, so the selected implementation removes the large snapshot from the client bundle and uses a loader plus dynamic import.
- React official docs describe `useDeferredValue` as a rendering optimization, so it was applied to search input processing.
- `lucide-react` is listed as an `optimizePackageImports` target, so the Next config now enables that experimental optimization.

## Uncertainty

- The snapshot JSON itself remains about 6MB. This slice prevents initial JavaScript chunk regressions; JSON sharding, compression, and cache strategy are follow-up work.
