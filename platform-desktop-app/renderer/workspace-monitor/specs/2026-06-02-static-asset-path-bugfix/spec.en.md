# Spec: Workspace Monitor Static Asset Path Bugfix

## Goal

Make the Workspace Monitor static export load JavaScript, CSS, and the workspace snapshot outside an HTTP-root-only deployment, including desktop shell and repository subpath static serving contexts.

## Requirement

- `REQ-WM-017`

## Problem Found

- `workspace-monitor/out/index.html` generated absolute `/_next/static/...` asset URLs.
- `SnapshotLoader` fetched `/workspace-snapshot.json` through an absolute URL.
- A `file://` smoke requested `_next` assets from `file:///_next/...`, so JavaScript and CSS failed to load.
- Opening `/workspace-monitor/out/index.html` from a repository-root static server had the same root `_next` failure risk.

## Behavior

- `next.config.mjs` uses `assetPrefix: "./"` so static export `_next` asset paths are document-relative.
- `SnapshotLoader` uses `new URL("workspace-snapshot.json", window.location.href)` so the snapshot JSON is fetched relative to the current document location.
- `perf:budget` checks both the JavaScript chunk budget and absolute `/_next` path regressions in generated `index.html`.

## Acceptance Criteria

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- Playwright opens `/workspace-monitor/out/index.html` from a repository-root static server and renders the `Desktop` UI without `_next` or snapshot request failures.

## Non-Goals

- Forcing local JSON fetch to work under regular Chromium `file://`
- Tauri public distribution signing, notarization, or updater work
- Snapshot JSON sharding or compression
