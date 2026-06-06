# Parallel Snapshot Collector 요청 추적

날짜: 2026-06-06

## 요청

병렬 구조, 멀티스레드, 멀티프로세스로 속도를 늘릴 수 있는 방법을 고려.

## 결과

Workspace Monitor snapshot collector에 Node worker thread pool을 구현했다. Rust/Tauri에는 이미 Rayon/background warmup 구조가 있으므로 중복 추가 대신 관측과 기록을 남겼다.

## 변경 파일

- `platform-desktop-app/renderer/workspace-monitor/scripts/lib/snapshot-worker-pool.mjs`
- `platform-desktop-app/renderer/workspace-monitor/scripts/lib/snapshot-file-worker.mjs`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/configs/tool-usage-integration-registry.json`
- `platform-desktop-app/configs/product-feature-registry.json`

## 검증

collect/check/test/build/package 모두 통과. `.app`와 DMG 산출물 검증 완료.
