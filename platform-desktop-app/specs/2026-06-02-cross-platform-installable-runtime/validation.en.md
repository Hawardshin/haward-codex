# Validation Plan

## Automated Validation

```bash
npm --prefix platform-desktop-app run check
npm --prefix platform-desktop-app test
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
python3 -m json.tool platform-desktop-app/configs/macos-execution-profile.json
python3 -m json.tool platform-desktop-app/configs/windows-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json ../platform-desktop-app/configs/macos-execution-profile.json ../platform-desktop-app/configs/windows-execution-profile.json
```

## Manual Validation

- Confirm README does not overstate the current state.
- Confirm no public-ready wording is used.
- Confirm Rust/Tauri dependencies were not actually installed.
- Confirm optional AI CLIs are not described as required runtimes.

## Deferred Validation

- `npm run tauri:dev`: after Rust/Tauri dependency installation audit.
- `npm run tauri:build`: after Rust/Tauri dependency installation and OS-specific signing/build prerequisites.
- macOS notarization/Windows signed installer: after credentials and clean-machine test environments are ready.

