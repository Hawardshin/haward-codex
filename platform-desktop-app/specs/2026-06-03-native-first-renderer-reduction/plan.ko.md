# 계획: Native-first renderer reduction

## Source Inventory

- Rust native runtime: `platform-desktop-app/src-tauri/src/lib.rs`
- Renderer shell: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- Renderer CSS: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- Runtime contract: `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- Readiness/test gates: `platform-desktop-app/scripts/check-readiness.mjs`, `platform-desktop-app/scripts/check-runtime-contract.mjs`, `platform-desktop-app/tests/readiness.test.mjs`

## 작업 순서

1. Web-first intake로 Tauri command, app config path, capability/runtime authority reference를 확인한다.
2. Rust에 `DesktopPreferences` schema, path, get/save command, normalization을 추가한다.
3. renderer의 `localStorage` preference persistence를 native command load/save로 교체한다.
4. settings data tab에 저장 상태와 path를 표시한다.
5. runtime contract와 readiness/test에 command surface와 no-localStorage guard를 추가한다.
6. TypeScript, Rust, customer build, product readiness 검증을 돌린다.

## Folder Structure 결정

- 선택지 A: 새 native module 파일로 분리
  - 장점: `lib.rs`를 줄일 수 있다.
  - 단점: 이번 slice에서는 기존 command 등록/검증 맥락을 따라가기 위해 import 구조가 늘어난다.
- 선택지 B: 기존 `lib.rs`의 desktop workspace state 근처에 preference store 추가
  - 장점: current Tauri command pattern과 storage helper를 그대로 따른다.
  - 단점: `lib.rs`가 계속 커진다.
- 선택: B. 다음 native-heavy slice에서 `preferences.rs`, `workspace_host.rs`, `cli_supervisor.rs` 모듈 분리를 진행한다.

## 검증 계획

- `cargo fmt`
- `cargo test`
- `cargo build`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `git diff --check`
