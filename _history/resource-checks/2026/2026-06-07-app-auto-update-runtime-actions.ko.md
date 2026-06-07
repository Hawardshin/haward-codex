# 리소스 점검

- 날짜: 2026-06-07
- 리스크 유형: Tauri updater 다운로드/설치, 앱 재시작, async command state.

## 점검

- long-running server: 새로 추가하지 않음.
- background worker/timer: 새로 추가하지 않음.
- Rust state: `PendingAppUpdate`는 `Mutex<Option<Update>>`로 마지막 확인 결과만 보관한다.
- async lock: 다운로드/설치 await 전에 pending update lock을 해제하도록 구현했다.
- restart: 설치 명령은 `restart: true`일 때 Tauri `app.restart()`를 호출한다. UI는 "Install & Restart"로 이 동작을 명확히 표시한다.
- failure path: updater 미구성, check 실패, pending update 없음, install 실패는 report 상태로 반환한다.

## 검증

- `cargo check`: 통과
- `cargo test`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
