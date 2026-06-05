# 작업 요약: Workspace Monitor 공격적 네이티브 메모리 워밍

## 완료

- Rust cache store를 `Arc` shared inner state로 바꿔 background OS thread가 cache를 갱신할 수 있게 했다.
- `warm_workspace_os_resources` 명령과 `WorkspaceResourceWarmupReport`를 추가했다.
- Tauri setup에서 앱 시작 즉시 `workspace-resource-warmup` thread를 시작한다.
- renderer bootstrap, workspace 변경, 저장 후 background warmup을 요청한다.
- preload 예산을 512개 파일/128MB로 늘리고 scan entry 한도를 40,000으로 늘렸다.
- UI에 `OS 캐시`, `메모리 예산`, `native warming` 표시를 추가했다.
- internal `.app`/`.dmg` 패키지 빌드까지 실행했다.

## 검증

- Rust/renderer/platform test/check 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal` 통과.
