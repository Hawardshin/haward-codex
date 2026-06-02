# Coding Research: Workspace Monitor Performance Budget

## Summary

The largest Workspace Monitor bottleneck was `lib/snapshot.ts` statically importing `src/generated/workspace-snapshot.json`, causing the roughly 6MB snapshot to be bundled into JavaScript. Build output measured the previous largest JS chunk at `6,224,897 bytes`; after the change, the largest JS chunk is `227,537 bytes`.

## research_profile_paths

- `agent-platform/configs/research/coding-research-profile.json`
- `agent-platform/configs/research/source-registry.json`

## technology_stack

- Next.js `16.2.6`
- React `19.2.6`
- TypeScript `6.0.3`
- `lucide-react` `1.17.0`
- Static export output

## source_types

- `official_docs`: Next.js lazy loading, Next.js `optimizePackageImports`, React `useDeferredValue`
- `repository_source`: `workspace-monitor/app/page.tsx`, `workspace-monitor/lib/snapshot.ts`, `workspace-monitor/components/MonitorShell.tsx`
- `measurement_output`: `du`, `wc`, `npm run build`, `npm run perf:budget`
- `community_discussion`: Next.js performance discussions used only as risk/adoption signals

## technology_official_docs

- https://nextjs.org/docs/app/guides/lazy-loading
- https://nextjs.org/docs/pages/api-reference/config/next-config-js/optimizePackageImports
- https://react.dev/reference/react/useDeferredValue

## stack_version_constraints

- The installed Next.js stack rejected top-level `optimizePackageImports`; the accepted shape is `experimental.optimizePackageImports`.
- Static export requires the snapshot to remain available at `public/workspace-snapshot.json`.

## language_options

- TypeScript/React: selected for UI/runtime loading changes because the bottleneck is client bundle and rendering.
- Node.js script: selected for deterministic performance budget checks because build output inspection is filesystem-based.
- Rust/Tauri: not selected for this slice because the measured bottleneck was web monitor bundle size, not desktop process execution.

## selected_language

- TypeScript/React for UI changes
- Node.js for the performance budget script

## architecture_options

- Option A: Keep the static JSON import and memoize filtering. Rejected because it leaves the 6MB client chunk intact.
- Option B: Fetch public JSON and lazy-load `MonitorShell`. Selected because it removes snapshot data from JavaScript and preserves static export compatibility.
- Option C: Shard the snapshot by category and fetch each section on demand. Deferred because it requires collector/schema changes across many UI paths.

## architecture_reference_sources

- Next.js lazy loading official docs
- Next.js package import optimization docs
- React deferred rendering docs
- Existing Workspace Monitor static snapshot architecture

## code_reference_sources

- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/app/page.tsx`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/scripts/collect-workspace.mjs`

## issue_discussion_sources

- Reddit/Next.js performance discussions found during web-first intake.

## issue_discussion_notes

- Community sources converged on "too much client JavaScript" and "large client components/imports" as common performance risks. They were not used as factual proof.

## decision

Selected Option B plus a small rendering responsiveness patch and a performance budget script.

## validation

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- Static server plus Playwright smoke
