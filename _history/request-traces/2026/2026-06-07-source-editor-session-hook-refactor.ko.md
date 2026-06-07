# 2026-06-07 소스 에디터 세션 훅 분리 요청 추적

## 요청

- 이전보다 넓은 범위로 계속 구현한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/useSourceEditorSession.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/index.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`

## 결과

- source editor 세션 상태와 draft sync lifecycle이 새 hook으로 이동했다.
- `MonitorShell.tsx`는 hook API를 통해 visible draft, active path, current editor content를 다룬다.
- 구조 계약과 readiness source map이 새 hook 경계를 확인한다.

## 검증

- 좁은 source editor 구조 테스트 통과.
- Tool Studio 계약 테스트 통과.
- Workspace Monitor check 통과.
- Workspace Monitor 전체 test 110개 통과.
- platform-desktop-app test 30개 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- Rust `cargo test` 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify` 통과.
