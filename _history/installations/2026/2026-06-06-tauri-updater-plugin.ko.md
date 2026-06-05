# 2026-06-06 설치 기록: Tauri updater plugin

## 상태

- 상태: installed
- 설치 대상: `tauri-plugin-updater v2.10.1`
- 소유 프로젝트: `platform-desktop-app`
- 설치 범위: project-local Rust dependency
- 환경 경로: `platform-desktop-app/src-tauri/`

## 설치 이유

공개 배포 경로가 signing/notarization만 확인하고 실제 signed updater artifact 생성 경로를 갖고 있지 않았다. Tauri 공식 updater plugin을 사용해 public build에서 `.app.tar.gz`, `.sig`, static `latest.json` manifest를 만들 수 있게 한다.

## 설치 전 조사

| 출처 | 확인일 | 확인 내용 |
| --- | --- | --- |
| https://v2.tauri.app/plugin/updater/ | 2026-06-06 | updater plugin, signing key, `createUpdaterArtifacts`, endpoint/static JSON 요구사항 |
| https://v2.tauri.app/distribute/sign/macos/ | 2026-06-06 | Developer ID signing, notarization env, stapling 흐름 |
| https://v2.tauri.app/reference/config/#macconfig | 2026-06-06 | macOS `entitlements` config path |
| `cargo info tauri-plugin-updater@2` | 2026-06-06 | version `2.10.1`, license `Apache-2.0 OR MIT`, rust-version `1.77.2` |

## 실제 설치

- 실행 명령: `cargo add tauri-plugin-updater@2`
- dependency 기록 파일:
  - `platform-desktop-app/src-tauri/Cargo.toml`
  - `platform-desktop-app/src-tauri/Cargo.lock`

## 보안/라이선스 검토

- 보안: project-local Rust dependency만 추가했다. updater private key와 Apple credential은 process environment에서만 읽고 repository, generated marker, installer payload에 쓰지 않는다.
- 라이선스: `tauri-plugin-updater`는 `Apache-2.0 OR MIT`.
- 유지보수: 공식 Tauri plugin workspace crate이며 Tauri v2 updater 문서와 함께 사용한다.

## 검증

- `cargo info tauri-plugin-updater@2`: version/license/rust-version 확인.
- `cargo check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과.
- `corepack pnpm --filter platform-desktop-app run release:preflight:public:report`: updater plugin은 통과, 외부 signing/notarization/updater secret env는 blocker로 정상 보고.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm --filter platform-desktop-app run package:internal`: 통과. `.app`/DMG 생성, codesign verify, hdiutil verify 포함.

## Rollback

- `platform-desktop-app/src-tauri/Cargo.toml`에서 `tauri-plugin-updater` 제거.
- `src-tauri/src/lib.rs`의 `tauri_plugin_updater::Builder` init 제거.
- public release config/build/manifest scripts와 package scripts를 제거.
- `Cargo.lock` 재생성 후 `cargo check`, desktop tests/check, internal package 검증 재실행.
