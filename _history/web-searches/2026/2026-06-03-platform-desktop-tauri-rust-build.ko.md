# 웹 검색 기록: platform-desktop-app Tauri/Rust 로컬 빌드

## 사용자 지시 요약

- 필수 설치를 완료하고 Rust로 `platform-desktop-app`를 로컬 빌드/테스트한 뒤, 필요한 개선을 시작하라는 요청.

## 검색어

- `Rust install rustup official cargo build test documentation`
- `Rust cargo build test official documentation`
- `Tauri v2 macOS prerequisites Rust cargo official`
- `Tauri v2 build command official documentation macOS`
- `Tauri v2 macOS code signing ad hoc signingIdentity official`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| `https://rust-lang.github.io/rustup/installation/` | 공식 문서 | `rustup`이 Cargo bin 경로에 Rust toolchain을 설치한다는 기준 | 이미 설치된 rustup/rustc/cargo는 추가 전역 설치 없이 버전 확인으로 처리 |
| `https://doc.rust-lang.org/cargo/commands/cargo-build.html` | 공식 문서 | `cargo build` 공식 빌드 명령 | `cargo build`를 Rust 개발 빌드 검증으로 사용 |
| `https://doc.rust-lang.org/stable/cargo/guide/tests.html` | 공식 문서 | `cargo test` 공식 테스트 흐름 | `cargo test`를 Rust 테스트 검증으로 사용 |
| `https://v2.tauri.app/start/prerequisites/` | 공식 문서 | Tauri v2 macOS 개발 전제 조건 | Xcode developer path, Node/npm, Rust toolchain을 확인 |
| `https://v2.tauri.app/start/create-project/` | 공식 문서 | Tauri CLI npm 설치/실행 흐름 | `@tauri-apps/cli` project-local install과 `tauri build`를 사용 |
| `https://v2.tauri.app/distribute/sign/macos/` | 공식 문서 | macOS ad-hoc signing identity 설정 | local/internal build용 `signingIdentity: "-"` 설정으로 `codesign --verify` 통과 |
| npm registry query via `npm view` | 패키지 레지스트리 | `@tauri-apps/cli@2.11.2`, `dompurify@3.4.7`, license metadata | 설치 감사와 보안 override 기록에 반영 |

## 약한 출처 제외

- 블로그, Q&A, 비공식 설치 가이드는 사용하지 않았다.
- npm audit의 `--force` 다운그레이드 제안은 semver major 변경이라 즉시 적용하지 않고, 같은 major의 `dompurify` override로 해결했다.

## 계획 반영 요약

- 전역 Rust 설치는 하지 않았다. `rustup 1.29.0`, `rustc/cargo 1.96.0`이 이미 설치되어 있었다.
- `platform-desktop-app`는 project-local Tauri CLI와 Cargo lock을 남겨 재현 가능한 로컬 빌드 경로로 전환했다.
- Tauri icon 부재로 Rust macro compile이 실패해 Tauri icon set을 생성했다.
- `.app` ad-hoc signing을 Tauri 설정에 명시해 local/internal build 검증에서 `codesign --verify`가 통과하게 했다.
- `workspace-monitor`의 `monaco-editor -> dompurify` audit 이슈는 `dompurify@3.4.7` override로 정리했다.

## 불확실성

- 이 작업은 local developer/internal test build다. public macOS 배포 준비는 Developer ID signing, notarization, stapling, clean-machine smoke, update/rollback 검증이 필요하다.
- Windows `msi/nsis` 빌드는 이번 macOS 로컬 빌드 범위 밖이다.

## 연결

- 계획: `_history/plans/2026/2026-06-03-platform-desktop-tauri-rust-build.ko.md`
- 설치 기록: `_history/installations/2026/2026-06-03-platform-desktop-tauri-rust-local-build.ko.md`
- 평가 입력: `_history/evaluations/2026/2026-06-03-platform-desktop-tauri-rust-build-evaluation-input.json`
