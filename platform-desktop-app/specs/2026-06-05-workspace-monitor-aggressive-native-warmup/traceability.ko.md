# 추적성: Workspace Monitor 공격적 네이티브 메모리 워밍

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-DESKTOP-WARM-2026-06-05-001 | `warm_workspace_os_resources`, `start_background_warmup`, Tauri setup warmup | Rust check, package build |
| REQ-DESKTOP-WARM-2026-06-05-002 | preload 512 files/128MB, scan 40,000 entries | readiness/test |
| REQ-DESKTOP-WARM-2026-06-05-003 | `WorkspaceResourceWarmupReport`, `OS 캐시`, `메모리 예산`, `native warming` UI | workspace-monitor test/check |
| REQ-DESKTOP-WARM-2026-06-05-004 | save 후 background force warmup | workspace-monitor test |

## 산출물

- `platform-desktop-app/docs/requirements/2026-06-05-workspace-monitor-aggressive-native-warmup.ko.md`
- `platform-desktop-app/specs/2026-06-05-workspace-monitor-aggressive-native-warmup/`
- `_history/request-traces/2026/2026-06-05-workspace-monitor-aggressive-native-warmup.ko.md`
- `_history/evaluations/2026/2026-06-05-workspace-monitor-aggressive-native-warmup.ko.md`
