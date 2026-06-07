# 2026-06-07 source structure duplication removal timing

- phase: web_first_intake
  - approximate_duration: short
  - notes: Rust, TypeScript, and React official structure/refactor references checked.
- phase: source_inventory
  - approximate_duration: medium
  - notes: duplicated source path/read lists found in readiness script, service readiness script, and readiness tests.
- phase: implementation
  - approximate_duration: medium
  - notes: shared source manifest added and consumers rewired.
- phase: validation
  - approximate_duration: long
  - notes: focused checks, project checks/tests, workspace monitor check, and internal package/run completed.
- bottleneck_candidates:
  - Tauri package build remains the dominant elapsed-time cost.
  - snapshot collection changes generated files during package validation.
