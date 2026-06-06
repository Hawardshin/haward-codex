# 2026-06-06 request to outcome trace

## 요청

README대로 했는데 desktop app 빌드/실행이 되지 않는 문제 해결.

## 원인

- Tauri `beforeDevCommand`가 잘못된 상대 경로를 사용했다.
- updater plugin이 public updater config 없이도 항상 초기화되어 internal/dev 실행을 panic으로 막았다.
- README에 빌드 후 실행 명령이 없었다.

## 산출물

- `platform-desktop-app/src-tauri/tauri.conf.json`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `package.json`
- `platform-desktop-app/package.json`
- `platform-desktop-app/scripts/open-internal-app.mjs`
- README/runbook/test/readiness/doctor updates

## 검증

README 기준 dev 실행, renderer collect/check/test/build, desktop doctor, Rust check, desktop tests, internal package, post-package dry-run, 실제 패키지 앱 실행 smoke가 통과했다.

## 결과

local/internal build/run 경로는 정상화됐다. 생성 산출물은 `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`와 `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`다.
