# Parallel Snapshot Collector 연구 요약

작성일: 2026-06-06

## 결론

현재 플랫폼에서 가장 안전한 병렬화 지점은 UI thread가 아니라 startup snapshot 수집 단계다. 문서 렌더링과 source preview는 파일 단위 독립 작업이므로 worker thread pool에 잘 맞는다.

## 비교

- Node `worker_threads`: CPU/변환 작업에 적합. 이번 구현 선택.
- Node `child_process`: 외부 CLI, 독립 process, pipe orchestration에 적합. 이번 slice에서는 과함.
- Rust/Rayon: 이미 workspace resource cache preload에 적용되어 있음. 중복 구현보다 관측 유지.
- Tauri async command: UI blocking을 피하는 command 경계. 기존 async provider command와 native runtime 구조 유지.

## 적용

- document transform workers: 최대 6
- source preview workers: 최대 4
- small task 또는 env disable: sync fallback
- snapshot stats: worker 수 노출
