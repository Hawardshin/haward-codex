# 2026-06-07 desktop package structure split timing

- phase: web_first_intake
  - approximate_duration: short
  - notes: Tauri and pnpm official references checked.
- phase: source_inventory
  - approximate_duration: short
  - notes: desktop pipeline modules, readiness script, and readiness test located.
- phase: implementation
  - approximate_duration: medium
  - notes: split modules added and compatibility façade retained.
- phase: validation
  - approximate_duration: long
  - notes: dry-run, checks, tests, Rust build/test, Tauri package, DMG verify, and app open completed.
- bottleneck_candidates:
  - Tauri release build and package generation dominate elapsed time.
  - generated snapshot collection changes many files during package verification.
