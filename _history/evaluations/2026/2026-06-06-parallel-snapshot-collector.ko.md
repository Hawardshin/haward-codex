# Parallel Snapshot Collector 평가

날짜: 2026-06-06

## 결과

status: passed_internal

병렬 구조를 실제 코드에 반영했다. 기존 Rust/Tauri 영역에는 이미 Rayon/background warmup/threaded stream readers가 있었으므로, 이번 변경은 단일 루프였던 Workspace Monitor snapshot collector에 bounded Node worker thread pool을 추가했다.

## 성능 관측

- `collect`: 280% CPU, 0.645s wall time
- snapshot stats: `snapshotDocumentWorkers=6`, `snapshotSourceWorkers=4`

## 검증

- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test` - 75개 통과
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm run desktop:package:internal`
- codesign verify 통과
- hdiutil verify VALID

## 한계

worker thread는 document/source 변환에 맞는 개선이다. 외부 CLI orchestration은 child_process/PTY pipeline으로 별도 설계해야 하고, UI rendering 자체는 browser main thread 제약을 존중해야 한다.
