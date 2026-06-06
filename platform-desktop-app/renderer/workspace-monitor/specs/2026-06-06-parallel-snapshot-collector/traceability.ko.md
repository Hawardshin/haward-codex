# Parallel Snapshot Collector 추적성

## 요구사항 연결

- REQ-PSC-001 -> `snapshot-worker-pool.mjs`, `collectDocumentsParallel`
- REQ-PSC-002 -> `collectSourceFileCandidates`, `collectSourceFilesParallel`
- REQ-PSC-003 -> `WORKSPACE_MONITOR_PARALLEL=0`, worker catch fallback
- REQ-PSC-004 -> `WorkspaceStats.snapshotDocumentWorkers`, `snapshotSourceWorkers`
- REQ-PSC-005 -> `src-tauri` existing Rayon/background warmup investigation

## 롤백

1. `collectDocumentsParallel`/`collectSourceFilesParallel` call sites를 sync 함수로 되돌린다.
2. worker pool files를 제거한다.
3. snapshot stats fields와 tests를 제거한다.
4. collect/check/test/build/package를 재실행한다.
