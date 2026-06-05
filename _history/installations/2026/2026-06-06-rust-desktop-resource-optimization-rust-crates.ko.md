# 2026-06-06 설치 기록: Rust desktop resource crates

## 상태

- 상태: installed
- 설치 대상: `rayon@1.12.0`, `sysinfo@0.39.3`
- 소유 프로젝트: `platform-desktop-app`
- 설치 범위: project-local Rust dependency
- 환경 경로: `platform-desktop-app/src-tauri/`

## 설치 이유

Workspace Monitor source workspace cache가 Rust/Tauri 프로세스에서 CPU parallelism과 OS memory telemetry를 사용해야 했다. `rayon`은 bounded parallel iterator/thread pool에 사용했고, `sysinfo`는 available/used/total memory 기반 preload budget과 UI telemetry에 사용했다.

## 설치 전 조사

| 출처 | 확인일 | 확인 내용 |
| --- | --- | --- |
| https://docs.rs/rayon/ | 2026-06-06 | parallel iterator/thread pool API |
| https://docs.rs/sysinfo/0.39.3 | 2026-06-06 | system memory telemetry API |
| `cargo info rayon@1.12.0` | 2026-06-06 | license `MIT OR Apache-2.0`, rust-version `1.80` |
| `cargo info sysinfo@0.39.3` | 2026-06-06 | license `MIT`, rust-version `1.95` |

## 실제 설치

- 실행 명령: `cargo add rayon@1.12.0 sysinfo@0.39.3`
- 후속 manifest 조정: `sysinfo = { version = "0.39.3", default-features = false, features = ["system"] }`
- dependency 기록 파일:
  - `platform-desktop-app/src-tauri/Cargo.toml`
  - `platform-desktop-app/src-tauri/Cargo.lock`

## 보안/라이선스 검토

- 보안: global install 없음. project-local Rust dependency만 추가했다. `sysinfo`는 default features를 끄고 `system` feature만 사용한다. secret, credential, private browser data 접근은 추가하지 않았다.
- 라이선스: `rayon`은 `MIT OR Apache-2.0`, `sysinfo`는 `MIT`.
- 유지보수: 두 crate 모두 crates.io/docs.rs 공식 crate metadata와 문서가 있다.

## 검증

- `cargo tree --manifest-path platform-desktop-app/src-tauri/Cargo.toml -i sysinfo -e features`: `system` feature 경로 확인.
- `cargo tree --manifest-path platform-desktop-app/src-tauri/Cargo.toml -i rayon -e features`: direct dependency 확인.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과. Rust test/build, Tauri app/DMG build, codesign verify, hdiutil verify 포함.

## Rollback

- `platform-desktop-app/src-tauri/Cargo.toml`에서 `rayon`, `sysinfo` 제거.
- `platform-desktop-app/src-tauri/src/lib.rs`의 `WorkspaceResourceProfile`, Rayon preload, sysinfo memory budget 변경 제거.
- `cargo update` 또는 lock 재생성 후 workspace-monitor/desktop checks 재실행.
