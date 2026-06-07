# 2026-06-07 source workbench controller hook 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `true`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-workbench-controller-hook.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-workbench-controller-hook.ko.md`

## 결과

- source workbench의 native invoke 및 editor command handler를 `useSourceWorkbenchController.ts`로 분리했다.
- `MonitorShell.tsx`의 inline handler 중복을 줄이고 source editor UI 연결만 남겼다.
- 구조 계약과 readiness source map이 새 controller hook을 확인한다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 12개.
- `node --test tests/source-editor-helper-behavior.test.mjs`: 통과, 4개.
- `node --test tests/tool-studio.test.mjs`: 통과, 54개.
- `node --test tests/readiness.test.mjs`: 통과, 15개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 111개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 통과, 8개.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
- 내부 앱 실행은 `reuse_existing_instance` 모드로 열렸다.
- `git diff --check`: 통과.
- Agent Workspace Platform DMG mount와 3217 개발 서버는 남지 않았다.
- 내부 앱 프로세스는 1개만 확인했다.

## 릴리스 경계

- 내부 실행과 패키징은 통과했다.
- 공개 배포 준비는 Developer ID signing, notarization, updater signing/endpoint, clean-machine smoke가 남아 있어 아직 주장하지 않는다.
