# Traceability: Deferred Native Git, Clipboard QA, PTY Decision

## User Request

- `UR-2026-06-03-056`: 이전에 미뤄진 구현 부족분을 모두 진행하라는 요청.
- `UR-2026-06-03-064`: 실제 GitHub Desktop 정도는 되어야 한다는 요청.
- `UR-2026-06-04-001`: 그 정도로 완전히 GitHub Desktop처럼 가야 한다는 요청.

## Requirements To Implementation

- `PDA-REQ-040` -> `platform-desktop-app/src-tauri/src/lib.rs`, `platform-desktop-app/renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx`, `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `PDA-REQ-064` -> `platform-desktop-app/src-tauri/src/lib.rs` diff preview payload, `NativeGitWorkbench.tsx` 3-pane changed-file/diff/commit layout, `app/globals.css` Native Git workbench styling, `tests/readiness.test.mjs` GitHub Desktop-like token checks.
- `PDA-REQ-065` -> `platform-desktop-app/src-tauri/src/lib.rs` selected file actions/history/stash payload, `NativeGitWorkbench.tsx` Changes/History/Stash tabs and include checkbox UX, `app/globals.css` scrollable native Git workbench lists, readiness Git token checks.
- `PDA-REQ-041` -> `platform-desktop-app/renderer/workspace-monitor/lib/clipboard.mjs`, `platform-desktop-app/tests/clipboard.test.mjs`
- `PDA-REQ-042` -> `platform-desktop-app/docs/architecture/pty-terminal-decision.ko.md`, `platform-desktop-app/docs/architecture/pty-terminal-decision.en.md`
- `PDA-REQ-043` -> `platform-desktop-app/configs/product-gap-registry.json`, `platform-desktop-app/scripts/check-readiness.mjs`, `platform-desktop-app/tests/readiness.test.mjs`

## Remaining Open Gates

- `componentized_desktop_ui_architecture`: `NativeGitWorkbench`는 분리했지만 전체 shell/source/settings/operator 분해는 계속 필요하다.
- `public_distribution_gates`: public release assets and clean-machine validation required.
