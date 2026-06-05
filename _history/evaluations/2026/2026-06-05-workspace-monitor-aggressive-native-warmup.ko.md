# 평가: Workspace Monitor 공격적 네이티브 메모리 워밍

## 판정

요청 충족. 기존 Rust cache를 더 공격적인 데스크톱 네이티브 경로로 확장했고, 앱 시작 시점부터 OS thread가 워크스페이스 자원을 읽어 앱 메모리에 올리도록 했다.

## 증거

- `warm_workspace_os_resources` 명령 추가.
- `workspace-resource-warmup` background thread 추가.
- Tauri setup startup warmup 추가.
- preload 한도 512 files/128MB, scan entry 40,000.
- renderer bootstrap과 workspace 변경/저장 후 background warmup 연결.
- UI에 `OS 캐시`, `메모리 예산`, `native warming` 표시.

## 검증

- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml --check`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`: 통과.
- `corepack pnpm --dir platform-desktop-app check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.

## 남은 리스크

- 파일 watcher는 아직 구현하지 않았다.
- public release notarization은 Apple 자격 증명이 없어 스킵된다.
