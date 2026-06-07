# 2026-06-07 리소스 점검: 앱 업데이트 Rust 모듈 분리

## 리스크 유형

- Rust shared state: `PendingAppUpdate(Mutex<Option<Update>>)`
- Tauri app packaging: `.app`, `.dmg` 생성과 검증
- 앱 실행: internal app open command

## 점검 결과

- 새 long-running server나 background worker를 추가하지 않았다.
- 새 파일 핸들, timer, subscription, network connection을 만들지 않았다.
- updater command는 기존과 같이 check/install 호출 시점에만 동작한다.
- internal package run은 종료 코드 0으로 완료되었고 필요한 `exec_command` 세션은 남기지 않았다.

## 산출물

- 내부 `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 공개 배포 리스크

공개 배포는 여전히 Developer ID signing, notarization, updater signing/public key, HTTPS endpoint, clean-machine smoke가 필요하다. 이번 작업은 내부 패키징 안정성 검증으로 제한했다.
