# 2026-06-06 desktop dev/run fix 작업 요약

## 구현

- `tauri.conf.json`의 dev renderer path를 수정했다.
- public updater config가 있을 때만 updater plugin을 초기화하도록 Rust startup을 바꿨다.
- `desktop:dev`, `desktop:run:internal`, `desktop:package:run:internal` root scripts를 추가했다.
- macOS internal `.app` open helper를 추가했다.
- README, release runbook, doctor, readiness contract를 갱신했다.

## 현재 검증

- `desktop:dev` 실행 smoke 통과.
- `desktop:run:internal -- --dry-run` 통과.
- `desktop:doctor`, `cargo check`, `platform-desktop-app test` 통과.
- `workspace-monitor collect/check/test/build` 통과.
- `desktop:package:internal` 통과. `.app`/DMG 생성과 codesign/hdiutil 검증 완료.
- `desktop:run:internal` 통과. 실제 패키지 앱 프로세스 기동 확인 후 종료.
