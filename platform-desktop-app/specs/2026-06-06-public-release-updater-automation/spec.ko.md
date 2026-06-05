# Public Release Updater Automation Spec

## 목표

`platform-desktop-app`에 실제 public release automation lane을 추가한다. internal package lane은 유지하고, public lane은 signing/notarization/updater 환경변수가 있을 때만 Tauri updater artifact와 static manifest를 생성한다.

## 구현 범위

- `tauri-plugin-updater` Rust dependency 추가 및 Tauri plugin init.
- public env 검증과 generated Tauri config 생성 script 추가.
- Tauri public build runner와 `latest.json` manifest generator 추가.
- `desktop:package:public` pipeline 추가.
- macOS `Entitlements.plist` 생성 및 Tauri config 연결.
- release/service/readiness checks와 tests 갱신.
- `package-public`은 public preflight를 expensive verification 앞에 둔다.
- `TAURI_SIGNING_PRIVATE_KEY_PATH`를 지원하고, ignored target 아래 developer-only updater env scaffold를 생성하는 명령을 제공한다.

## 보안 경계

- `TAURI_SIGNING_PRIVATE_KEY`, `TAURI_SIGNING_PRIVATE_KEY_PATH`, `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`, Apple credential은 process env에서만 읽는다.
- developer-only updater key는 ignored `src-tauri/target/` 아래에만 생성하고 repository에는 쓰지 않는다.
- generated `service-update-channel.json`는 public endpoint, public key hash, 존재 여부 metadata만 기록한다.
- internal build는 기존 ad-hoc signing identity `-`와 public blocker reporting을 유지한다.

## 완료 조건

- Rust `cargo check` 통과.
- desktop app tests/check 통과.
- public preflight report가 updater code path는 통과시키고 외부 credential/env blocker만 남긴다.
- `desktop:package:public`은 외부 credential/env가 없으면 Workspace Monitor/Rust verification을 다시 돌기 전에 실패한다.
- `desktop:release:dev-env`가 local updater dev key/env scaffold를 만들고, 해당 env를 source하면 updater 관련 public preflight blocker는 사라져야 한다.
- internal package build가 계속 `.app`/DMG를 생성하고 검증한다.
