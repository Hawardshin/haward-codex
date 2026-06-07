# 2026-06-07 provider account settings hook refactor trace

- request_summary: 전반 구조 리팩토링과 코드 분리를 계속 진행한다.
- outcome:
  - provider account/model settings state and actions moved into `useProviderAccountSettings`.
  - `MonitorShell.tsx` now consumes the hook and passes returned state/actions to settings and agent surfaces.
  - provider panel common labels/feedback id use `runtimeCatalog.ts`.
- artifacts:
  - `_history/web-searches/2026/2026-06-07-provider-account-settings-hook-refactor.ko.md`
  - `_history/plans/2026/2026-06-07-provider-account-settings-hook-refactor.ko.md`
  - `_history/evaluations/2026/2026-06-07-provider-account-settings-hook-refactor.ko.md`
- validation_summary:
  - workspace monitor check/test passed.
  - platform desktop app check/test passed.
  - internal Tauri app and DMG package/run passed.
- commit:
  - not created in this turn because the worktree contains many pre-existing unrelated dirty/untracked changes mixed with ongoing generated artifacts.
