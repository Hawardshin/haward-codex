# Request Trace: GitHub Desktop-like Git Workbench

## Request

- ID: `UR-2026-06-03-064`
- Summary: 실제 GitHub Desktop 정도의 Git 작업대가 되어야 한다는 요청.

## Outcome

- Tauri `DesktopGitFileReport`에 `changeKind`, staged/unstaged/untracked/conflicted flags, additions/deletions, bounded `diffPreview`를 추가했다.
- `NativeGitWorkbench`를 3-pane layout으로 재구성했다: 변경 파일 목록, 선택 파일 diff preview, commit/sync panel.
- Git file rows는 선택 가능한 row가 되었고, 선택 파일 diff preview는 addition/deletion/meta/context line style로 렌더링된다.
- Native Git architecture docs, product gap registry, requirements/spec/tasks/traceability/readiness token을 갱신했다.

## Validation

- `cargo check`: pass
- `corepack pnpm --filter workspace-monitor run check`: pass
- `corepack pnpm --filter platform-desktop-app test`: pass
- `corepack pnpm --filter workspace-monitor run test`: pass
- `corepack pnpm --filter workspace-monitor run build:customer`: pass
- `corepack pnpm --filter workspace-monitor run perf:budget`: pass
- `corepack pnpm --filter platform-desktop-app run check`: pass
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: pass
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-gap-registry.json`: pass
- Browser Git workbench smoke: pass

## Artifacts

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/docs/architecture/native-git-workbench.ko.md`
- `platform-desktop-app/docs/architecture/native-git-workbench.en.md`
- `platform-desktop-app/specs/2026-06-03-deferred-native-git-clipboard-pty/`
