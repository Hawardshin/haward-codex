# 2026-06-07 소스 에디터 draft 파생 상태 분리 작업 요약

## 변경 사항

- `sourceDrafts.ts`에 draft dirty/open/current selector helper를 추가했다.
- `MonitorShell.tsx`의 draft list, dirty set, current dirty, save-all 대상 산출을 helper 호출로 바꿨다.
- draft tab dirty 표시도 `isSourceDraftEntryDirty`를 사용하게 했다.
- `source-editor-templates.test.mjs`가 새 selector helper 경계를 확인한다.

## 코드 크기

- `MonitorShell.tsx`: 14,353줄.
- `sourceDrafts.ts`: 120줄.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 6개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 101개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
