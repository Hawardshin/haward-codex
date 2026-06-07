# 2026-06-07 source workbench controller hook 요청 추적

## 요청

- 넓은 부분도 계획을 세워 계속 구현한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/useSourceWorkbenchController.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/index.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`

## 결과

- source editor native read/write, save-all, close/revert, AGENTS.md prepare, template/patch/context copy handler가 controller hook으로 이동했다.
- shell은 hook에서 반환된 handler를 UI에 연결한다.
- stale async load, save-time mutation lock, source draft transition 계약을 hook 중심으로 테스트한다.

## 검증

- 좁은 source editor 구조 테스트 통과.
- Tool Studio 계약 테스트 통과.
- platform desktop readiness 테스트 통과.
- workspace-monitor check 통과.
- workspace-monitor 전체 테스트 111개 통과.
- platform-desktop-app 전체 테스트 30개 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- Rust `cargo test` 8개 통과.
- macOS `.app` codesign 검증과 DMG verify 통과.
