# 2026-06-07 소스 에디터 세션 훅 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `true`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-session-hook-refactor.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-session-hook-refactor.ko.md`

## 결과

- source editor 상태 전환 helper 다음 단계로 세션 ref/timer lifecycle을 `useSourceEditorSession.ts`로 분리했다.
- `MonitorShell.tsx`의 직접 ref/timer 소유를 줄이고 source editor lifecycle cleanup을 hook에 모았다.
- 구조 계약과 readiness source map이 새 hook을 검증한다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 11개.
- `node --test tests/source-editor-helper-behavior.test.mjs`: 통과, 4개.
- `node --test tests/tool-studio.test.mjs`: 통과, 54개.
- `node --test tests/readiness.test.mjs`: 통과, 15개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 110개.
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

## 다음 후보

- source editor native invoke handler 전체를 controller hook으로 옮긴다.
- dirty draft close confirmation과 save failure UI 상태를 더 직접 검증한다.
