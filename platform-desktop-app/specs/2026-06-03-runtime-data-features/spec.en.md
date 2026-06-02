# Runtime Data Feature Spec

## Goal

- Implement the OS storage adapter, installer payload scanner, support diagnostic bundle, and customer snapshot sanitization that were out of scope for the prior runtime data boundary steering.
- Keep the platform development source tree out of the installed customer bundle's public snapshot.

## Features

- `list_runtime_data_roots`: create and report app config/data/local data/cache/log, task-run store, agent workspace, support bundle, and payload audit roots.
- `run_installer_payload_audit`: scan the Tauri resource payload for source/private/internal artifact risks.
- `create_support_diagnostic_bundle`: export a redacted manifest and bounded task-run metadata summary under app data.
- `buildCustomerSnapshot`: strip source/docs/history/internal artifacts from the static customer snapshot.
- `check-customer-bundle.mjs`: audit `workspace-monitor/out` and the public snapshot that will be embedded through Tauri `frontendDist`.
- `check-release-readiness.mjs`: report internal/local build readiness separately from public distribution release blockers.

## Out Of Scope

- Public macOS notarization, auto updater, and Windows NSIS smoke testing.
- Full customer workspace backup/export lifecycle.
- Issuing Developer ID certificates, notarization credentials, or storing release secrets.
