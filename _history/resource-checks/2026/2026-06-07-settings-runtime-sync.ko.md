# Resource Check

- 날짜: 2026-06-07
- 리소스 위험:
  - 동기화가 source cache scan, workspace warmup, readiness check를 포함할 수 있어 중복 호출 위험이 있다.
- 완화:
  - `settingsSyncInFlightRef`, queued options, 350ms debounce timer를 사용했다.
  - unmount 시 동기화 timer를 정리한다.
  - source cache는 source 저장/AGENTS.md/workspace 변경 또는 수동 동기화에서만 force refresh한다.
- 결과:
  - 장기 실행 프로세스나 새 Rust worker를 추가하지 않았다.

