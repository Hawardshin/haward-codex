# Research Summary: Workspace Monitor Static Asset Path Bugfix

## Technology Stack

- Next.js static export
- React client component
- Browser Fetch API
- Tauri desktop shell target

## Language/Runtime Options

- TypeScript/Next.js config change: selected. It fixes generated asset URLs and client fetching inside the existing project boundary.
- Rust/Tauri backend change: deferred. The issue is static frontend asset pathing in the WebView, and the Rust toolchain is not currently available.

## Architecture Options

- Relative URL static export: selected. It works in desktop/subpath contexts without server rewrite assumptions and preserves the current Next export structure.
- Fixed `basePath`/subpath: deferred. It can fit a specific subpath but is less flexible for desktop/file-like packaging and multiple deployment paths.
- Serve the snapshot through a Tauri backend API: deferred. This may be useful later, but it expands the scope beyond the static export path bug.

## Reference Evidence

- Official Next.js static export docs: confirmed static HTML/CSS/JS asset serving assumptions.
- Official Next.js `assetPrefix` docs: confirmed influence on `_next/static` asset paths.
- Official MDN `Window.fetch()` docs: confirmed URL object resource support.
- Official Tauri asset protocol docs: confirmed that regular browser file URLs and packaged WebView asset serving differ.

## Implementation Decision

- Use `assetPrefix: "./"` to make `_next` asset paths relative.
- Use `new URL("workspace-snapshot.json", window.location.href)` in `SnapshotLoader`.
- Add absolute `/_next` regression detection to the performance budget check.

## Validation Decision

- Validate a subpath scenario by serving the repository root and opening `/workspace-monitor/out/index.html`.
- Record regular Chromium `file://` JSON fetch failure without treating it as a final Tauri asset protocol failure.
