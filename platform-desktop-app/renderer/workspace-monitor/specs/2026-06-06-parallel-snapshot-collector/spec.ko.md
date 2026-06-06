# Parallel Snapshot Collector 스펙

## 목표

Workspace Monitor startup snapshot 수집 중 독립적인 document rendering/source preview 작업을 병렬 worker thread pool로 분산한다.

## 설계

- `snapshot-worker-pool.mjs`: task count와 `os.availableParallelism()` 기준으로 bounded worker 수를 정한다.
- `snapshot-file-worker.mjs`: document/source 작업 단위 하나를 처리한다.
- `collectDocumentsParallel`: 문서 task를 worker pool로 변환한다.
- `collectSourceFilesParallel`: source 후보를 정렬/상한 적용한 뒤 선택된 파일만 worker pool로 읽는다.
- `WORKSPACE_MONITOR_PARALLEL=0`: worker 비활성화 fallback.

## 수용 기준

- `collect`가 성공하고 snapshot stats에 `snapshotDocumentWorkers`, `snapshotSourceWorkers`가 기록된다.
- multi-core developer machine에서 충분한 task 수가 있으면 worker 수가 1보다 크다.
- 정렬 결과는 기존처럼 deterministic해야 한다.
- worker 실패 시 synchronous fallback이 존재해야 한다.
