# Installable Software Productization Requirement Change

## Change Overview

- Date: 2026-06-02
- Source request: `UR-2026-06-02-004`
- Added requirement: `REQ-WS-050`
- Work mode: `governance`

## User Request Summary

The user said they are now considering making the platform installable software, like Visual Studio-style software.

## Change

Add `REQ-WS-050` so end-user installer packaging is managed as a separate productization project.

- New root project: `platform-desktop-app/`
- Separate existing `install_mode` from desktop installer packaging.
- Compare Tauri, Electron, and native-packaging-only candidates.
- Treat signing, notarization, update, uninstall, rollback, privacy, and dependency/license review as release gates.
- If dependency installation actually occurs, create an installation audit record.

## Evidence

- Electron official docs treat application packaging/distribution as a separate topic.
- Tauri official docs provide OS-specific distribution and installer paths.
- Microsoft MSIX docs explain the Windows app package format.
- Apple Developer docs treat notarization as a trust step before macOS software distribution outside the App Store.
