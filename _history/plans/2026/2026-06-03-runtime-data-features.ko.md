# 계획: Runtime Data Feature Implementation

## 범위

- OS-aware runtime data roots
- task-run runtime store migration with legacy read compatibility
- installer payload scanner
- redacted support diagnostic bundle
- customer static snapshot sanitization

## 큰 범위 분해

- slice-1: Rust storage/audit/support commands
- slice-2: Workspace Monitor UI and snapshot collector
- slice-3: readiness/tests/build verification

## 제외

- `_private/` inspection
- public signing/notarization
- customer workspace backup/export lifecycle 전체

## Merge Gate

- customer public snapshot source/docs count is 0.
- Rust/Tauri build and local bundle verification pass.
