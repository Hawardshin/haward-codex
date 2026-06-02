# 요청-결과 추적: platform-desktop-app Tauri/Rust 로컬 빌드

## 요청

- ID: `UR-2026-06-03-006`
- 요약: 필수 설치를 완료하고 Rust로 로컬 빌드/테스트를 수행한 뒤, 필요한 개선을 시작하라는 요청.

## 소유 경계

- 소유 프로젝트: `platform-desktop-app`
- 공유 의존: `workspace-monitor`, `_history`, `_ops/installations`
- 제외: `_private/`, 외부 AI CLI 설치, public macOS 배포 인증서/공증

## 결과

- Rust/rustup/Cargo가 이미 설치되어 있음을 확인했다.
- `platform-desktop-app` project-local Tauri CLI 설치 lock을 추가했다.
- Cargo dependency를 해소하고 `Cargo.lock`을 추적 대상으로 만들었다.
- Tauri icon set을 생성해 missing icon compile failure를 해결했다.
- Tauri npm script의 frontend build 중복을 제거했다.
- local/internal build용 ad-hoc signing identity를 설정했다.
- `workspace-monitor`의 `dompurify` audit issue를 override로 해결했다.
- macOS `.app`와 `.dmg`를 생성하고 검증했다.

## 검증

- `cargo test`: passed
- `cargo build`: passed
- `npm --prefix platform-desktop-app run tauri:build`: passed
- `codesign --verify --deep --strict`: passed
- `hdiutil verify`: passed
- local app open/quit smoke: passed

## 산출물

- 설치 기록: `_history/installations/2026/2026-06-03-platform-desktop-tauri-rust-local-build.ko.md`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-03-platform-desktop-tauri-rust-build.ko.md`
- 평가 입력: `_history/evaluations/2026/2026-06-03-platform-desktop-tauri-rust-build-evaluation-input.json`
- 번들 산출물: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- DMG 산출물: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 남은 경계

- public macOS readiness는 아직 아니다.
- Windows installer build는 이번 요청 범위 밖이다.
- 기존 untracked `platform-desktop-app/workspace-monitor/package-lock.json`는 삭제/커밋하지 않았다.
