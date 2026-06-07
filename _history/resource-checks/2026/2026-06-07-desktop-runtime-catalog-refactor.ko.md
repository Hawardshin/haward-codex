# 2026-06-07 데스크톱 런타임 카탈로그 분리 리소스 점검

## 리스크

- 전체 내부 패키징은 Rust/Tauri 빌드, DMG 생성, macOS 앱 열기를 포함한다.
- 장기 실행 세션은 `desktop:package:run:internal` 한 건이었다.

## 결과

- 패키징 세션은 종료 코드 0으로 끝났다.
- 별도 개발 서버나 백그라운드 프로세스를 남기지 않았다.
- 내부 앱은 `open -n`으로 실행되었고, 이는 사용자가 요청한 내부 실행 명령의 결과다.

## 산출물

- `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
