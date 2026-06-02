# 계획: platform-desktop-app Tauri/Rust 로컬 빌드

## 작업 모드

- 선택: `ship_first`
- 이유: 사용자가 설치와 Rust 로컬 빌드/테스트 완료를 우선 요청했다. 동작 검증이 먼저이고, 비차단 요구사항/spec backfill은 이 모드에서 선택 사항이다.
- 설치 모드: `developer`
- 설치 모드 이유: 플랫폼 데스크톱 앱 소스와 테스트/빌드 harness를 개선하고 검증하는 작업이다.
- 소유 프로젝트: `platform-desktop-app`

## 작업 범위

- Rust/rustup/Cargo/Xcode/Node/npm 현재 설치 상태 확인
- `platform-desktop-app`와 `workspace-monitor` 로컬 dependency 설치
- Cargo dependency 해소, Rust test/build 실행
- Tauri 로컬 build 실행
- 빌드 실패가 있으면 좁은 범위에서 수정
- 설치 감사 기록, web search 기록, 누락/resource/evaluation 기록 업데이트

## 비범위

- public macOS 배포 readiness 선언
- Developer ID signing, notarization, stapling
- 외부 AI CLI 설치 또는 인증 설정
- `_private/` 읽기 또는 민감 파일 접근

## 현재 기준

- Rust/rustup/Cargo는 이미 사용자 로컬 경로에 설치되어 있다.
- macOS Xcode developer path는 설정되어 있다.
- 공식 Tauri v2 문서는 macOS 데스크톱 개발에 Xcode 또는 Command Line Tools, Rust, Node를 요구한다.
- Tauri CLI는 npm devDependency로 설치 가능하다.

## 실행 순서

1. 설치 감사 초안을 만든다.
2. `npm --prefix platform-desktop-app ci`와 `npm --prefix workspace-monitor ci`를 실행한다.
3. `cargo fetch`, `cargo test`, `cargo build`를 실행한다.
4. `npm --prefix platform-desktop-app run tauri:build`를 실행한다.
5. 실패하면 원인별로 설정/소스/asset을 좁게 수정하고 재검증한다.
6. 설치 감사, 레지스트리, omission/resource/evaluation/history를 업데이트한다.
7. 변경을 커밋하고 `origin/main`에 push한다.

## 성공 기준

- 필수 local dependency 설치가 완료된다.
- Rust `cargo test`와 `cargo build`가 통과한다.
- Tauri build가 로컬에서 통과하거나, OS signing/public 배포 전제 조건 때문에 막힌 경우 그 경계가 명확히 기록된다.
- README의 이전 "Rust 미설치로 막힘" 상태가 실제 상태와 맞게 갱신된다.
