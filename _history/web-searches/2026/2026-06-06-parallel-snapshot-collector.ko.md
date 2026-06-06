# Parallel Snapshot Collector 웹 검색 기록

날짜: 2026-06-06

## 쿼리

- `Node.js official worker_threads documentation parallel CPU tasks`
- `Node.js official child_process documentation spawn parallel processes`
- `Tauri v2 official documentation async commands state task spawn`
- `Rust standard library std::thread official documentation spawn`

## 출처와 영향

| 출처 | 판단 |
| --- | --- |
| https://nodejs.org/api/worker_threads.html | CPU-bound JS 작업은 worker thread로 offload하는 것이 적합하다. |
| https://nodejs.org/api/child_process.html | 독립 실행 command/pipe는 child process 경계가 맞다. 이번 slice는 파일 변환이라 worker thread를 선택했다. |
| https://v2.tauri.app/develop/calling-rust/ | Tauri async command는 별도 async task 경계가 있으므로 UI thread blocking 회피 원칙을 유지한다. |
| https://doc.rust-lang.org/std/thread/ | Rust thread는 channel/message passing과 함께 쓰는 것이 표준 경계다. 현재 Rust는 이미 Rayon/thread 구조가 있다. |

## 계획 영향

Node collector에는 worker thread pool을 추가하고, Rust/Tauri에는 중복 thread 추가 대신 기존 Rayon/background warmup 구조를 유지한다.
