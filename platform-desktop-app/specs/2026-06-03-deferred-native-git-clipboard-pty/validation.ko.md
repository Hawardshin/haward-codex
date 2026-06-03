# Validation: Deferred Native Git, Clipboard QA, PTY Decision

## 실행한 검증

- `cargo check` in `platform-desktop-app/src-tauri`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 20 tests
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-gap-registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: 통과
- `git diff --check`: 통과
- Browser smoke at `http://127.0.0.1:4187/`: 실행 화면에서 `Native Git Workbench`, `Git 상태 새로고침`, `전체 변경 커밋`, `Pull --ff-only`, `Push` 렌더링 확인
- Browser smoke: 다크 테마 suspicious white background count 0
- Browser smoke: terminal drawer open rect `1218 x 656` on `1280 x 720` viewport

## 저장된 QA 산출물

- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/outputs/browser-qa/platform-desktop-native-git-workbench.png`

## 제한

- Public distribution readiness는 signing/notarization/updater/clean-machine smoke가 없어서 계속 release gate로 남는다.
- xterm/PTY는 구현하지 않고 optional extension decision으로 닫았다.
- 전체 MonitorShell componentization은 아직 structural debt로 남는다.
