# 2026-06-07 소스 에디터 액션 상태 분리 요청 추적

## 요청

- 히스토리를 보고 좁게 잡힌 이전 작업보다 넓은 범위로 구현한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/sourceDraftActions.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/index.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/utils/import-type-script-module.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-helper-behavior.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`

## 결과

- source editor의 주요 액션 상태 전환이 새 helper 모듈로 이동했다.
- 저장 대상 생성과 저장 report 병합이 공통 함수로 통합됐다.
- 테스트 importer가 상대 TS/TSX 모듈을 처리해 새 helper의 실제 import 구조를 검증한다.

## 검증

- Workspace Monitor check와 test 통과.
- Desktop app test 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- Rust `cargo test` 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify` 통과.
