# Installable Software Productization Web Search Record

## Request

The user asked to consider making the platform installable software, similar to Visual Studio-style software.

## Queries

- `Electron application distribution official docs installer code signing notarization`
- `Tauri distribution bundler official docs macOS Windows Linux installer`
- `Microsoft MSIX desktop app packaging official docs installer`
- `Apple notarizing macOS software before distribution official documentation`

## Sources Checked

| Source | Type | Use |
| --- | --- | --- |
| Electron Application Packaging | official docs | Electron desktop packaging candidate |
| Electron Forge Makers | official docs | OS-specific installer maker options |
| Tauri Distribute | official docs | Tauri desktop distribution candidate |
| Tauri Windows Installer | official docs | Windows MSI/NSIS options |
| Microsoft MSIX docs | official docs | Windows packaging format |
| Apple notarization docs | official docs | macOS outside-App-Store trust gate |

## Weak Sources Ignored

- Reddit notarization/MSIX discussions may reveal operational issues, but they were treated only as auxiliary signals for this structural decision.
- Wikipedia-style overview pages were not used as current distribution requirement evidence.

## Plan Impact

- Installable productization is an end-user distribution problem above `install_mode`.
- A separate root project is needed.
- Recommend a Tauri-first prototype while keeping Electron and native-packaging-only as comparison candidates.
- OS-specific release gates should be explicit in config.
- Do not install dependencies in this work; review them later with installation audit.

## Remaining Uncertainty

- Final desktop framework choice depends on native API needs, updater strategy, Python sidecar/local service design, and OS priorities.
- Signing certificates and notarization account status have not been checked.
