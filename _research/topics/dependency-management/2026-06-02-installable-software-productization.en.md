# Installable Software Productization Research Note

## Research Date

2026-06-02

## Sources Checked

- Electron application distribution official docs: `https://www.electronjs.org/docs/tutorial/application-distribution/`
- Electron Forge makers official docs: `https://www.electronforge.io/config/makers`
- Tauri distribute official docs: `https://tauri.app/distribute/`
- Tauri Windows installer official docs: `https://tauri.app/distribute/windows-installer/`
- Microsoft MSIX official docs: `https://learn.microsoft.com/en-us/windows/msix/`
- Apple notarization official docs: `https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution`

## Key Insights

- An installable app is a distribution trust chain, not just a local setup script.
- macOS signing and notarization are release gates.
- Windows requires an installer format and signing strategy across MSIX/MSI/NSIS-style options.
- Tauri and Electron can both wrap a web UI as a desktop shell, but differ in bundle size, runtime, updater, and ecosystem trade-offs.
- The platform already has `workspace-monitor` as a web UI candidate, so validating the desktop shell boundary is more maintainable than duplicating UI first.

## Plan Impact

- Created `platform-desktop-app/` as a new root project.
- Recorded Tauri-first prototype as the initial direction while keeping Electron and native-packaging-only as comparison candidates.
- Did not install dependencies.
