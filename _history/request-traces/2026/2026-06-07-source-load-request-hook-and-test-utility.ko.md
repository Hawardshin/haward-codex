# 2026-06-07 소스 로드 요청 훅 및 테스트 유틸 분리 요청 추적

## 요청

- 미뤄둔 구현을 계속하고, 큰 소스와 중복 로직을 기능 이슈 없이 분리한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/useSourceLoadRequestGate.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/index.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/utils/import-type-script-module.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-helper-behavior.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`
- `platform-desktop-app/scripts/open-internal-app.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 결과

- source load request sequencing이 reusable hook으로 이동했다.
- 테스트 공통 import shim이 한 파일로 모였다.
- 구조 계약과 readiness 집계가 새 모듈을 검증한다.
- 내부 앱 실행은 기본적으로 기존 인스턴스를 재사용하며, `--new-instance`를 명시한 경우에만 새 인스턴스를 연다.

## 검증

- Workspace Monitor check와 test 통과.
- Desktop app test 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify` 통과.
- 중복 내부 앱 프로세스를 정리한 뒤 최종 실행 프로세스 1개를 확인했다.
