# Request Trace: Runtime Setup Check

## 요청

터미널 설정과 자동 CLI 설정이 실제로 되었는지 확인하는 기능 추가.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-runtime-setup-check.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-runtime-setup-check/`
- 구현:
  - `platform-desktop-app/src-tauri/src/lib.rs`
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 누락/리소스 체크: `_history/plan-evidence/2026/2026-06-06-runtime-setup-check-omission-resource-check.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-runtime-setup-check.ko.md`

## 검증

- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor collect && pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `pnpm --dir platform-desktop-app package:internal`: 통과.
- Browser 렌더링 확인: 통과.

## 결과 상태

- 구현과 internal package 검증 완료.
- commit/push 대기.
