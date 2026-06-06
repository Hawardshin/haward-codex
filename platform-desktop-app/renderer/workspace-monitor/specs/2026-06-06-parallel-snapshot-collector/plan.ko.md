# Parallel Snapshot Collector 계획

1. 공식 문서로 Node worker_threads, child_process, Tauri async command, Rust thread 경계 확인
2. 현재 병렬 구조 조사
3. Rust 쪽은 기존 Rayon/background warmup 구조를 유지
4. Node snapshot collector의 document/source transform을 worker pool로 분산
5. worker 수를 snapshot stats로 노출
6. Tool Playbook registry에 병렬 snapshot 패턴 추가
7. collect/check/test/build/package 검증
