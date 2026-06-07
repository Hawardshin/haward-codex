# 2026-06-07 provider account settings hook refactor timing

- phase: web_first_intake
  - approximate_duration: short
  - notes: React official hook/refactor references checked.
- phase: source_inventory
  - approximate_duration: medium
  - notes: provider credential/model state, effects, panel props, tests, readiness scripts located.
- phase: implementation
  - approximate_duration: medium
  - notes: hook extraction, shell hookup, panel common catalog usage, tests/readiness scripts updated.
- phase: validation
  - approximate_duration: long
  - notes: full check/test/package run completed.
- bottleneck_candidates:
  - Tauri package/run dominates elapsed time.
  - Large dirty tree makes commit scoping expensive.
