# 2026-06-07 앱 업데이트 Rust 모듈 분리 계획

## 소유 경계

- 프로젝트: `platform-desktop-app`
- 대상 영역: Tauri Rust 런타임, service readiness source map, readiness tests
- 선택한 view mode: `superadmin_developer`
- 선택한 install mode: `developer`

## 구조 선택

### 옵션 A: 앱 업데이트 로직을 `features::app_update` 모듈로 분리

- 장점: 기존 `features` feature map 구조와 맞고, Rust command 경로만 명확히 바꾸면 기능 계약을 유지할 수 있다.
- 단점: readiness/test source map에 새 파일을 포함해야 한다.

### 옵션 B: updater 전용 crate 또는 service package 생성

- 장점: 장기적으로 런타임 도메인을 더 강하게 분리할 수 있다.
- 단점: 현재 변경 범위보다 크고 Cargo 경계, 의존성, command registration을 더 많이 바꿔 회귀 위험이 커진다.

## 결정

옵션 A를 선택했다. 지금 목표는 큰 파일을 줄이면서 기능 이슈를 만들지 않는 것이므로, 크레이트 경계 변경 없이 `features/app_update.rs`를 추가하고 기존 Tauri 앱 builder 계약은 유지한다.

## 작업 단계

1. 앱 업데이트 상태, 보고서 타입, check/install command, updater report helper를 새 Rust 모듈로 이동한다.
2. `lib.rs`는 `PendingAppUpdate` 관리와 `generate_handler` 등록만 유지하도록 정리한다.
3. feature map에 `app-update-recovery` 그룹을 등록한다.
4. readiness source structure와 tests가 새 파일까지 검사하도록 조정한다.
5. Rust, TypeScript, readiness, package pipeline을 순서대로 검증한다.
