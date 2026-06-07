# 2026-06-07 provider account settings hook refactor resource check

- resource_risk_occurred: true
- 이유:
  - React hook effect, async Tauri invoke, package/run command, macOS app launch를 다뤘다.
- lifecycle checks:
  - `useProviderAccountSettings` initial credential load effect uses a cancellation flag.
  - provider model refresh does not open persistent handles.
  - package command completed; no terminal session left running.
  - internal app launch was performed by `open -n` through the project script.
- resource_check_targets:
  - `_history/resource-checks/2026/2026-06-07-provider-account-settings-hook-refactor.ko.md`
