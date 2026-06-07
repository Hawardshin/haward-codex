# 2026-06-07 source structure duplication removal plan

- work_mode: standard
- view_mode: superadmin_developer
- install_mode: developer
- slice_id: desktop-readiness-source-structure-manifest
- source_inventory:
  - `check-readiness.mjs` and `readiness.test.mjs` both had long duplicated source file read lists.
  - `check-service-readiness.mjs` duplicated a subset of the same monitor/Rust source files.
- implementation_plan:
  - add shared `source-structure.mjs` manifest.
  - move Tauri feature module names, Tauri runtime source paths, monitor workbench paths, and support check paths into that manifest.
  - update readiness scripts and tests to read source bundles through the manifest.
  - update `requiredFiles` to consume the same source manifest instead of repeating source file paths.
- validation_gate:
  - focused node syntax/readiness tests.
  - project check/test.
  - workspace-monitor TypeScript check.
  - internal package/run.
