# Installation Audit: Tauri Opener and Clipboard Plugins

## 상태

- status: installed
- date: 2026-06-06
- owning_project: platform-desktop-app
- scope: project-local Rust dependencies

## 설치 목적

- Provider 계정 설정 버튼을 OS default browser open 기능에 연결한다.
- Terminal copy/paste를 system clipboard 경로에 연결한다.
- raw shell opener와 browser clipboard fallback 의존도를 낮춘다.

## 실행 명령

- `cd platform-desktop-app/src-tauri && cargo add tauri-plugin-opener@2 tauri-plugin-clipboard-manager@2`

## dependency record targets

- `platform-desktop-app/src-tauri/Cargo.toml`
- `platform-desktop-app/src-tauri/Cargo.lock`
- `platform-desktop-app/src-tauri/capabilities/default.json`

## 보안 검토

- project-local Rust dependency만 추가한다.
- global install, shell PATH 변경, credential file 직접 열람, browser cookie 접근은 없다.
- Clipboard read 권한은 민감할 수 있으므로 plain text read/write만 허용하고 terminal paste/copy action에서만 사용한다.
- Opener는 provider 공식 URL과 docs/setup URL을 여는 용도다.

## version and lock status

- `tauri-plugin-opener` resolved to `2.5.4`.
- `tauri-plugin-clipboard-manager` resolved to `2.3.2`.
- Exact resolved versions are recorded in `platform-desktop-app/src-tauri/Cargo.lock`.

## license review

- `cargo info tauri-plugin-opener@2.5.4`: Apache-2.0 OR MIT.
- `cargo info tauri-plugin-clipboard-manager@2.3.2`: Apache-2.0 OR MIT.

## 검증 결과

- `cargo check`: passed.
- `cargo test`: passed.
- `cargo info tauri-plugin-opener@2.5.4`: license Apache-2.0 OR MIT.
- `cargo info tauri-plugin-clipboard-manager@2.3.2`: license Apache-2.0 OR MIT.
- `corepack pnpm --filter workspace-monitor test`: passed, 79 tests.
- `corepack pnpm --filter workspace-monitor run check`: passed.
- `corepack pnpm --filter workspace-monitor run build`: passed.
- `corepack pnpm --filter workspace-monitor run smoke:terminal-provider-actions`: passed.
- `corepack pnpm --filter platform-desktop-app test`: passed, 27 tests.
- `corepack pnpm --filter platform-desktop-app run check`: passed with public release signing/updater/clean-machine gates still reported as public blockers.
- `corepack pnpm --dir platform-desktop-app run package:internal`: passed with app and DMG build, codesign verification, and DMG verification.
- In-app Browser static render check: desktop section and terminal launcher rendered from `http://127.0.0.1:4180/?section=desktop#desktop`.

## rollback

- `platform-desktop-app/src-tauri/Cargo.toml`에서 `tauri-plugin-opener`, `tauri-plugin-clipboard-manager` 제거
- Cargo.lock 재생성
- `lib.rs` plugin init/native clipboard/open provider changes 되돌림
- `default.json` opener/clipboard permissions 제거
- renderer clipboard native path와 smoke script 제거
