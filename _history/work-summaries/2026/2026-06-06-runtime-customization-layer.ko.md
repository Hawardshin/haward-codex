# Work Summary: Runtime Customization Layer

## 완료 내용

- 데스크톱 preferences에 `runtimeCustomization`을 추가했다.
- 설정 execution 탭에 `실행 커스텀` 섹션을 추가했다.
- provider별 기본 모델과 API base URL을 설정에서 수정할 수 있게 했다.
- provider 직접 실행과 모델 목록 확인이 커스텀 모델/base URL을 사용하도록 Rust 경로를 수정했다.
- native PTY 시작 시 커스텀 셸 명령과 시작 명령을 반영했다.
- 터미널 빠른 명령을 설정에서 편집하고 드로어에 반영하도록 했다.
- 정적 테스트 계약을 추가했다.

## 변경 파일 중심

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `cargo check` from `platform-desktop-app/src-tauri`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.
