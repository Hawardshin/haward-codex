# Shared Workspace Resource Cache 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-146 | resident `desktop`/`source` panel이 동시에 올라와도 동일한 `warm_workspace_os_resources` 요청은 in-flight와 짧은 TTL cache를 공유해야 한다. | must | `sharedWorkspaceWarmupInFlight`, `SHARED_WORKSPACE_WARMUP_CACHE_TTL_MS` |
| REQ-PDA-147 | 동일한 source filter와 옵션의 `prepare_workspace_os_resources` 요청은 panel instance별로 중복 실행하지 않고 공유해야 한다. | must | `sharedWorkspacePrepareInFlight`, `SHARED_WORKSPACE_PREPARE_CACHE_TTL_MS` |
| REQ-PDA-148 | `forceRefresh` 요청은 stale cache를 쓰지 않아야 하며, 같은 force-refresh key의 동시 요청만 공유해야 한다. | must | key에 `forceRefresh` 포함 |
| REQ-PDA-149 | 기존 fallback 경로인 `list_workspace_text_files`는 유지되어야 한다. | must | shared prepare fallback |
| REQ-PDA-150 | 변경 후 TypeScript, renderer checks, platform tests, browser smoke, internal package가 통과해야 한다. | must | validation record |

## 결정

- native Rust 명령 자체는 유지한다.
- React component instance 사이의 중복 호출만 공유한다.
- 새 dependency는 도입하지 않는다.
