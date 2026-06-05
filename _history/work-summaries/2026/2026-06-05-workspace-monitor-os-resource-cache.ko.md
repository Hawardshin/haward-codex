# 작업 요약: Workspace Monitor OS 자원 기반 캐시

## 완료

- Tauri Rust 런타임에 `WorkspaceResourceStore` managed state를 추가했다.
- `prepare_workspace_os_resources` 명령을 추가해 workspace 파일 목록과 제한된 텍스트 파일 내용을 OS 파일시스템에서 미리 읽어 Rust 메모리에 올리도록 했다.
- list/read/write 명령을 cache-aware로 변경하고 workspace 변경/저장 시 cache를 무효화했다.
- Workspace Monitor source workbench가 native preparation 명령을 호출하고 `OS 캐시` 상태를 표시하도록 연결했다.
- runtime contract, readiness, renderer/platform tests를 갱신했다.
- 내부 `.app`와 `.dmg` 패키징까지 실행했다.

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/specs/2026-06-05-workspace-monitor-os-resource-cache/`

## 검증

- Rust/renderer/platform test/check 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal` 통과.
