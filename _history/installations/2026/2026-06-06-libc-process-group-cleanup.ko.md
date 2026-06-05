# 설치 기록: libc process group cleanup dependency

## 요약

- 날짜: 2026-06-06
- 프로젝트: `platform-desktop-app`
- 범위: project-local Rust dependency manifest declaration
- 패키지 관리자: Cargo
- 설치/변경 명령: manual `Cargo.toml` dependency declaration followed by `cargo check`
- 대상: `platform-desktop-app/src-tauri/Cargo.toml`

## 변경

`libc = "0.2.186"`을 직접 의존성으로 명시했다. 이 crate는 기존 `Cargo.lock`에 transitive dependency로 이미 존재했으므로 새 crate resolution churn은 발생하지 않았다. 직접 선언 이유는 Unix/macOS process group cleanup에서 `libc::kill(-pid, SIGKILL)`을 호출하기 위함이다.

## 보안 검토

- project-local Rust dependency declaration only.
- global install, credential access, browser cookie access, network client 추가 없음.
- `SIGKILL` 대상은 앱이 직접 spawn하고 `process_group(0)`으로 분리한 CLI adapter/command process group으로 제한한다.

## 라이선스 검토

- `cargo info libc@0.2.186` 기준 license는 `MIT OR Apache-2.0`, rust-version은 `1.65`다.
- 후속 SBOM 감사는 `Cargo.lock` 기준으로 수행한다.

## 검증

- `cargo info libc@0.2.186`: version/license/rust-version 확인.
- `cd platform-desktop-app/src-tauri && cargo check`: 통과.
- `cd platform-desktop-app/src-tauri && cargo test`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, readiness token 확인.
- `corepack pnpm run desktop:package:internal`: 통과, `.app`/`.dmg` 생성 및 codesign/DMG 검증 완료.

## Rollback

`platform-desktop-app/src-tauri/Cargo.toml`에서 `libc` 직접 의존성을 제거하고 `kill_child_process_tree`의 Unix process group signal path를 되돌린 뒤 `cargo check`, `platform-desktop-app test`, `desktop:package:internal`을 재실행한다.
