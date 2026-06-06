# Work Summary: Runtime Setup Check

## 완료 내용

- 설정 > CLI 어댑터 섹션에 `설정 점검` 버튼을 추가했다.
- 선택된 CLI adapter는 기존 health check로 PATH/version 상태를 확인한다.
- 터미널 셸은 새 Rust command로 command/cwd 해석만 확인한다.
- 점검 결과 패널에서 terminal shell과 selected CLI 상태를 따로 보여준다.
- browser preview에서 Tauri runtime 없음 fallback 상태까지 확인했다.

## 변경 파일 중심

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증

- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor collect && pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `pnpm --dir platform-desktop-app package:internal`: 통과.
