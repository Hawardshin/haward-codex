# Web Search: Accumulated Data Format

## 사용자 지시 요약

- 사용자가 필요하다면 데이터 저장형식을 바꾸라고 지시했다.

## 검색어

- `Tauri v2 store plugin official docs app data local storage`
- `Tauri v2 path app data directory official docs`
- `SQLite WAL official documentation`

## 확인한 출처

- Tauri Store plugin: `https://v2.tauri.app/plugin/store/`
- Tauri Store JavaScript reference: `https://v2.tauri.app/reference/javascript/store/`
- Tauri Path API: `https://v2.tauri.app/reference/javascript/api/namespacepath/`
- SQLite Write-Ahead Logging: `https://www.sqlite.org/wal.html`

## 판단 요약

- Tauri Store 문서는 app data directory에 파일 기반 상태를 저장하고 앱 재시작 사이에 로드/저장할 수 있는 모델을 제공한다.
- Tauri Path API는 app-specific data directory를 제품 runtime data plane으로 쓰는 현재 구조와 맞는다.
- SQLite WAL은 다중 reader/write 동시성에는 강하지만, DB 백업/체크포인트/마이그레이션까지 같이 설계해야 하므로 이번 UI 조회 slice에서 즉시 도입하기에는 범위가 크다.
- 현재 task-run JSON/log, decision inbox, audit/support artifact 구조는 provenance가 이미 파일 단위로 남아 있으므로, raw store를 파괴적으로 migration하지 않고 versioned overview manifest를 추가하는 것이 가장 작은 제품급 저장 포맷 변경이다.

## 계획 반영

- `get_accumulated_data_overview`가 raw directory scan 결과를 바로 반환하는 데서 끝나지 않고 `app_data/runtime-data/indexes/accumulated-data-overview.v1.json` manifest를 저장한다.
- manifest는 `schemaVersion`, `storageFormatVersion`, `indexPath`, `formatMigrationStatus`를 포함한다.
- runtime contract는 accumulated data target을 `runtime_data_index_manifest`로 고정한다.

## 약한 출처

- Reddit, Stack Overflow 검색 결과는 채택하지 않았다.
