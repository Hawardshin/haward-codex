# 2026-06-07 소스 에디터 helper 동작 테스트 요청 추적

## 요청

- 부족한 부분을 구현한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/sourceDrafts.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-helper-behavior.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`

## 결과

- 저장 결과 병합 중복을 공통 helper로 제거했다.
- source document/draft helper 직접 동작 테스트를 추가했다.

## 검증

- Workspace Monitor check와 test 통과.
- Desktop app test 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify` 통과.
