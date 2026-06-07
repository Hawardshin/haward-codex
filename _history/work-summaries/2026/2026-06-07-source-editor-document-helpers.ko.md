# 2026-06-07 소스 에디터 문서 helper 분리 작업 요약

## 변경

- `sourceDocuments.ts`를 추가해 `renderAgentsMdStarter`, `formatSourceDiffLine`, `buildSourcePatchContext`를 분리했다.
- `MonitorShell.tsx`는 source workbench의 현재 상태를 helper에 전달하는 역할만 남겼다.
- `source-editor/index.ts`, 구조 계약 테스트, readiness source map을 갱신했다.

## 검증 현황

- `node --test tests/source-editor-templates.test.mjs`: 통과, 8개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 103개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
