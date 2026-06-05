# 계획: Rust 데스크톱 자원 최적화

## 단계

1. 공식 문서와 crate metadata로 Tauri command, Rayon, sysinfo 사용 가능성을 확인한다.
2. 기존 `WorkspaceResourceStore`와 source workspace renderer 계약을 읽는다.
3. Rust cache build에 resource profile, bounded Rayon pool, parallel preload를 추가한다.
4. renderer type/UI/test/readiness 계약을 새 telemetry에 맞춘다.
5. dependency 설치 기록과 rollback 계획을 남긴다.
6. `package:internal`까지 실행해 `.app`/`.dmg` 생성과 검증을 확인한다.

## 리스크 관리

- RAM 사용은 hard cap과 available-memory based budget으로 제한한다.
- worker 수는 `available_parallelism`과 hard cap 16 사이에서 제한한다.
- file watcher는 범위에서 제외하고 기존 refresh/warmup invalidation을 유지한다.
