# 작업 요약

- 날짜: 2026-06-07
- 프로젝트: platform-desktop-app
- 범위: Tauri updater 런타임 명령, Service Readiness UI 액션, 계약/검사 보강.

## 완료

- Rust 런타임에 `check_app_update`와 `install_app_update` 명령을 추가했다.
- pending update를 앱 상태로 보관하고, 설치 명령이 마지막 확인 결과를 다운로드/설치하도록 연결했다.
- updater 플러그인이 설정되지 않았거나 endpoint 확인이 실패해도 앱이 깨지지 않고 상태 보고서로 degrade하도록 처리했다.
- Service Readiness 패널에 업데이트 확인, 설치 후 재시작 버튼과 결과 표시를 추가했다.
- `installer-shell-runtime-contract`, readiness 검사, 테스트, service-readiness registry에 새 업데이트 명령을 반영했다.
- service readiness 리포트가 `Updater runtime actions exposed` 통과 항목을 표시하도록 스크립트와 Rust 리포트를 맞췄다.

## 확인한 결과

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `cargo check`: 통과
- `cargo test`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과
