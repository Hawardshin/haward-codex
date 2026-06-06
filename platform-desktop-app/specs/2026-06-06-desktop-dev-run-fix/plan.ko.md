# 계획: desktop dev/run fix

1. 공식 Tauri/Next/updater 문서를 확인한다.
2. README 기준 명령을 재현한다.
3. `beforeDevCommand` 상대 경로를 수정한다.
4. updater plugin 초기화를 public updater config가 있을 때로 제한한다.
5. root/project 실행 scripts와 macOS internal app open script를 추가한다.
6. README, release runbook, doctor, readiness tests를 갱신한다.
7. `desktop:dev`, `desktop:run:internal -- --dry-run`, doctor, tests, Rust check, build/package를 검증한다.
8. resource cleanup, close-out 기록, commit/push를 완료한다.
