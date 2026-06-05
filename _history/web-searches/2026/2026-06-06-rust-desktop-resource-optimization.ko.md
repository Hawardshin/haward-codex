# 웹 검색 기록: Rust 데스크톱 자원 최적화

## 목적

Rust/Tauri 경로에서 CPU parallelism과 RAM-aware preload를 실제로 구현할 때 어떤 공식 API와 crate가 적합한지 확인했다.

## 검색어

- `Tauri v2 Rust commands async state manage official docs performance`
- `Tauri v2 sidecar state Rust official docs CPU heavy task background thread`
- `Rust rayon parallel iterators official docs CPU bound workloads`
- `Rust sysinfo crate CPU memory official docs`
- `Tokio spawn_blocking CPU-bound official docs`
- `memmap2 Rust memory mapped file docs mmap crate`
- `walkdir Rust crate docs parallel file scan ignore crate docs`
- `Tauri v2 commands Rust invoke official docs`
- `site:docs.rs/tokio latest spawn_blocking tokio task official docs`
- `site:v2.tauri.app/develop calling-rust commands Tauri v2 official docs`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| Tauri Calling Rust: https://v2.tauri.app/develop/calling-rust/ | 공식 문서 | frontend invoke에서 Rust command를 호출하는 bridge 확인 | 기존 Tauri command/report surface 유지 |
| Rayon docs: https://docs.rs/rayon/ | 공식 crate 문서 | parallel iterator와 thread pool 사용 경로 확인 | entry build와 preload read에 bounded Rayon pool 사용 |
| sysinfo docs: https://docs.rs/sysinfo/0.39.3 | 공식 crate 문서 | system memory telemetry API 확인 | available/used/total memory 기반 budget/report 추가 |
| Tokio spawn_blocking: https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html | 공식 crate 문서 | blocking task offload 옵션 확인 | 기존 sync command/background thread 구조에서는 Rayon pool이 더 작아 미채택 |
| memmap2 docs: https://docs.rs/memmap2/ | 공식 crate 문서 | memory mapped file 옵션 확인 | 여러 텍스트 파일 bounded preload에는 unsafe mmap 도입이 과해 미채택 |

## Cargo metadata 확인

- `cargo search rayon --limit 3`: 최신 `rayon = "1.12.0"` 확인.
- `cargo search sysinfo --limit 3`: 최신 `sysinfo = "0.39.3"` 확인.
- `cargo info rayon@1.12.0`: license `MIT OR Apache-2.0`, rust-version `1.80`.
- `cargo info sysinfo@0.39.3`: license `MIT`, rust-version `1.95`.

## 계획 영향

- Rust in-process cache를 유지하되 CPU-bound/file read 준비 작업에 `rayon`을 넣었다.
- OS memory telemetry는 `sysinfo`로 읽고, preload budget은 available memory의 일부로 clamp했다.
- sidecar daemon, renderer worker cache, mmap은 이번 변경 범위에서 제외했다.

## 불확실성

- OS memory pressure는 순간값이므로 장시간 앱 실행 중에는 다음 warmup에서 최신 profile이 반영된다.
- file watcher는 아직 없다. 외부 편집 변경은 refresh/warmup invalidation에 의존한다.
