# 2026-06-07 소스 에디터 catalog helper 분리 작업 요약

## 변경 사항

- `sourceCatalog.ts`를 추가해 source catalog 선택, AGENTS.md 경로, catalog label, 파일 필터, 선택 파일, root label 계산을 분리했다.
- `source-editor/index.ts`가 source catalog helper를 재export하도록 정리했다.
- `MonitorShell.tsx`의 source catalog 파생 계산을 helper 호출로 바꿨다.
- `source-editor-templates.test.mjs`와 `tool-studio.test.mjs`가 새 모듈 경계를 확인한다.
- `scripts/readiness/source-structure.mjs`가 분리된 source-editor helper 파일을 monitor workbench aggregate source로 포함하게 했다.

## 코드 크기

- `MonitorShell.tsx`: 14,335줄.
- `sourceCatalog.ts`: 73줄.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 7개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 102개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
