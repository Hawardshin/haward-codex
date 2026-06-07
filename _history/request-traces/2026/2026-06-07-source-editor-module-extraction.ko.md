# 2026-06-07 소스 에디터 모듈 분리 요청 추적

## 요청

- 소스코드 중심으로 계속 구현한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/sourceTemplates.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/monacoConfig.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/index.ts`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`

## 결과

- `MonitorShell`의 정적 소스 에디터 설정/헬퍼를 분리하고 구조 테스트를 추가했다.

## 검증

- Workspace Monitor 테스트와 체크 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify` 통과.
