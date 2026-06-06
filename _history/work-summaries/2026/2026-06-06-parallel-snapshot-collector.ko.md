# Parallel Snapshot Collector 작업 요약

날짜: 2026-06-06

## 완료

- Workspace Monitor snapshot collector를 async worker-thread 구조로 전환했다.
- 문서 렌더링은 최대 6개 worker로 분산한다.
- source preview는 후보를 먼저 정렬/상한 적용한 뒤 최대 4개 worker로 읽는다.
- worker 실패 또는 작은 task에서는 기존 sync path로 fallback한다.
- snapshot stats에 `snapshotDocumentWorkers`, `snapshotSourceWorkers`를 추가했다.
- Tool Playbook registry에 `snapshot-worker-thread-pool` 패턴과 parallel snapshot ladder를 추가했다.

## 검증

- collect: 통과, document workers 6, source workers 4
- check: 통과
- test: 75개 통과
- build: 통과
- desktop package: 통과
- codesign/hdiutil: 통과

## 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
