# 2026-06-07 앱 셸 Rust 모듈 분리 계획

## 요청 해석

사용자의 “싹다 구현” 요청은 남은 구조 분리와 기능 이슈 제거를 계속 진행하라는 의미로 해석했다. 범위가 넓기 때문에 large-scope decomposition을 적용하고 첫 실행 슬라이스를 선택했다.

## 소스 인벤토리

- 큰 파일: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`, `platform-desktop-app/src-tauri/src/lib.rs`, `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 제외: generated snapshot JSON, screenshots, Cargo.lock, build target 산출물
- 대표 샘플: `src-tauri/src/lib.rs`, `src-tauri/src/features/mod.rs`, `src-tauri/src/features/app_shell.rs`, readiness scripts, runtime contract tests

## 구조 옵션

- 옵션 A: `app_shell` read-only command부터 실제 구현 모듈로 이동
- 옵션 B: `workspace/git` 또는 `cli/pty` 같은 대형 상태ful 영역부터 이동

## 결정

옵션 A를 선택했다. command 3개가 read-only이고 process/PTY/git 상태를 건드리지 않아 회귀 위험이 낮다. 또한 readiness/test를 runtime source aggregate 기준으로 바꾸면 이후 더 큰 모듈 이동의 기반이 된다.

## 첫 실행 슬라이스

- slice_id: `app-shell-rust-module-split`
- touch_paths:
  - `platform-desktop-app/src-tauri/src/features/app_shell.rs`
  - `platform-desktop-app/src-tauri/src/features/mod.rs`
  - `platform-desktop-app/src-tauri/src/lib.rs`
  - `platform-desktop-app/scripts/readiness/source-structure.mjs`
  - `platform-desktop-app/scripts/check-readiness.mjs`
  - `platform-desktop-app/scripts/check-runtime-contract.mjs`
  - `platform-desktop-app/tests/readiness.test.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- verification: Rust check/test, runtime contract, readiness, platform check/test, workspace monitor check/test, internal package/run

## 패키징 안정화 추가 슬라이스

- issue: 반복 `desktop:package:run:internal`에서 Tauri generated `bundle_dmg.sh` 단계가 stale DMG artifact를 남기며 실패할 수 있다.
- decision: public release flow와 분리해 internal/prepared build에만 cleanup/recovery wrapper를 적용한다.
- touch_paths:
  - `platform-desktop-app/scripts/cleanup-macos-dmg-intermediates.mjs`
  - `platform-desktop-app/scripts/tauri-build-with-dmg-recovery.mjs`
  - `platform-desktop-app/scripts/desktop-pipeline/steps.mjs`
  - `platform-desktop-app/tests/readiness.test.mjs`
- verification: exact internal package/run command, repeated prepared Tauri build, app codesign verify, DMG hdiutil verify

## 후속 경로

다음으로 `workspace.rs`의 path/cache/git 구현 또는 `cli.rs`의 session/process 구현을 이동하되, 각 슬라이스마다 command name과 runtime source aggregate 검사를 유지한다.
