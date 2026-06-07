# 2026-06-07 source structure duplication removal trace

- request_summary: 소스 구조에서 중복되는 부분을 제거한다.
- outcome:
  - added shared desktop readiness source manifest.
  - removed duplicated long source file read lists from readiness script and tests.
  - service readiness now uses the shared source subset.
  - required source files are derived from the same manifest.
- artifacts:
  - `_history/web-searches/2026/2026-06-07-source-structure-duplication-removal.ko.md`
  - `_history/plans/2026/2026-06-07-source-structure-duplication-removal.ko.md`
  - `_history/evaluations/2026/2026-06-07-source-structure-duplication-removal.ko.md`
  - `_history/work-summaries/2026/2026-06-07-source-structure-duplication-removal.ko.md`
- validation_summary:
  - focused syntax/readiness tests passed.
  - platform-desktop-app check/test passed.
  - workspace-monitor check passed.
  - internal desktop package/run passed.
- commit:
  - not created in this turn because the current worktree contains many unrelated pre-existing dirty/untracked changes mixed with generated artifacts.
