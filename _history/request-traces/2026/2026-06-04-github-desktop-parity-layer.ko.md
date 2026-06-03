# Request Trace: GitHub Desktop Parity Layer

## Request

- `UR-2026-06-04-001`

## Requirement

- `PDA-REQ-065 GitHub Desktop Parity Layer`

## Implementation Targets

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/configs/product-gap-registry.json`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/architecture/native-git-workbench.ko.md`
- `platform-desktop-app/docs/architecture/native-git-workbench.en.md`
- `platform-desktop-app/specs/2026-06-03-deferred-native-git-clipboard-pty/`

## Outcome

- Native Git Workbench now exposes a GitHub Desktop-like local Git workbench with Changes/History/Stash views, include checkboxes, selected/all commit, selected discard, selected/all stash, stash apply/pop/drop, fetch/pull/push, bounded history, and bounded stash state.

## Validation Targets

- `cargo check`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`
- `git diff --check`
- Browser smoke for Native Git Workbench layout and scroll containment.
