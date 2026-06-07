# 2026-06-07 source structure duplication removal work summary

- 완료:
  - `scripts/readiness/source-structure.mjs`를 추가했다.
  - Tauri feature module 목록, Tauri runtime source bundle, monitor workbench source bundle, service readiness source subset, readiness support files를 하나의 manifest로 모았다.
  - `check-readiness.mjs`가 공통 source map과 required source list를 사용하도록 변경했다.
  - `check-service-readiness.mjs`가 같은 source subset을 사용하도록 변경했다.
  - `tests/readiness.test.mjs`가 같은 manifest로 feature module names and source bundles를 읽도록 변경했다.
- 결과:
  - 새 feature/source 파일 추가 시 readiness script/test/service check의 목록을 따로 맞출 필요가 줄었다.
  - source structure 검증의 단일 기준점이 생겼다.
