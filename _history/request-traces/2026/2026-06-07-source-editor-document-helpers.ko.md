# 2026-06-07 소스 에디터 문서 helper 분리 요청 추적

## 요청

- 계속 구현하고, 소스 구조 분리와 중복 제거를 이어간다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/sourceDocuments.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/index.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`

## 결과

- AGENTS starter 문서와 source patch context 문서 생성 로직을 source-editor helper로 이동했다.
- 구조 계약 테스트가 helper export와 `MonitorShell.tsx` inline 문자열 제거를 확인한다.

## 검증

- Workspace Monitor check와 test 통과.
- Desktop app test 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify` 통과.
