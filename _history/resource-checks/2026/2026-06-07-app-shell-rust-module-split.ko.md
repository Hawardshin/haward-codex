# 2026-06-07 리소스 점검: 앱 셸 Rust 모듈 분리

## 리스크 유형

- Tauri command module 이동
- macOS package build와 DMG generation
- internal app open

## 점검 결과

- 새 프로세스, worker, timer, subscription, network connection을 추가하지 않았다.
- 앱 셸 명령은 read-only 상태 조회와 bundled/runtime contract 읽기만 수행한다.
- DMG bundling 실패가 반복될 수 있어 generated target DMG/intermediate 상태를 build 직전 정리한다.
- prepared build wrapper는 Tauri build를 먼저 실행하고, macOS에서 `.app`, `bundle_dmg.sh`, `icon.icns`가 있을 때만 DMG 생성 복구 프로세스를 한 번 실행한다.
- 최종 `desktop:package:run:internal`은 `.app` 서명 검증, DMG verify, internal app open까지 완료했다.
- 반복 `tauri:build:prepared`도 완료했다.

## 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
