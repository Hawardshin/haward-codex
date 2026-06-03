# 데스크톱 제품 폴더 구조 재편 작업

| 작업 | 상태 | 산출물 |
| --- | --- | --- |
| 루트 `workspace-monitor/`를 제품 renderer 경로로 이동 | 완료 | `platform-desktop-app/renderer/workspace-monitor/` |
| pnpm workspace, lockfile, Tauri frontendDist/dev command 갱신 | 완료 | `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `tauri.conf.json` |
| desktop readiness/customer bundle scripts 경로 갱신 | 완료 | `platform-desktop-app/scripts/`, `tests/readiness.test.mjs` |
| collector repo root와 snapshot source paths 갱신 | 완료 | `renderer/workspace-monitor/scripts/collect-workspace.mjs` |
| project registry/root policy/docs/maps 갱신 | 완료 | `_ops/projects/`, `_ops/maps/`, `_docs/`, product docs/configs |
| customer snapshot/build/test/perf/audit 검증 | 완료 | validation record |
| web search, omission, evaluation, request trace 기록 | 완료 | `_history/` records |
