# 2026-06-07 소스 에디터 순수 로직 분리 요청 추적

## 요청

- 지속적으로 소스코드 중심 구현을 진행한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/sourceDiff.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/sourceLanguage.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/index.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`

## 결과

- 소스 에디터 순수 계산 로직을 source-editor 모듈로 이동했다.
- 구조 회귀 테스트가 새 경계를 확인한다.

## 검증

- Workspace Monitor 테스트와 체크 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify` 통과.
