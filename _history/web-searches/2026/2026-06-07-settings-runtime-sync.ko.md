# Web Search Record

- 날짜: 2026-06-07
- 요청: 설정 저장 후 앱 화면과 런타임 상태가 직접 동기화되지 않는 문제 개선.
- 검색어:
  - `Tauri v2 React state sync settings invoke refresh official docs`
  - `React useSyncExternalStore external store settings synchronization official docs`
  - `Tauri v2 commands state frontend invoke official docs`
- 확인한 출처:
  - React `useSyncExternalStore` 공식 문서: 외부 저장소 상태는 subscribe/getSnapshot 흐름으로 화면 갱신을 보장해야 한다.
  - Tauri v2 calling Rust 공식 문서: 프론트엔드는 `invoke`로 Rust command를 호출하고 반환 데이터를 다시 받아 상태를 갱신한다.
  - Tauri v2 state management 공식 문서: 앱 상태는 command와 managed state를 통해 읽고 갱신한다.
- 반영:
  - 새 Rust command를 추가하지 않고 기존 read/list/report command를 묶는 프론트 동기화 orchestration을 선택했다.
  - 저장 후 개별 패널 refresh에 의존하지 않고 계정, CLI, workspace, readiness, run record, source cache를 한 번에 맞추도록 설계했다.

