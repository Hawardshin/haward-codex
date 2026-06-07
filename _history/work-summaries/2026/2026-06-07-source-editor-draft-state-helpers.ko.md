# 2026-06-07 소스 에디터 draft 상태 helper 분리 작업 요약

## 변경 사항

- `sourceDrafts.ts`를 추가해 source draft 생성, 내용 병합, 저장 결과 반영, 제거 로직을 분리했다.
- `source-editor/index.ts`가 draft helper를 재export하도록 정리했다.
- `MonitorShell.tsx`는 source draft 상태 전이를 helper 호출로 위임한다.
- `source-editor-templates.test.mjs`와 `tool-studio.test.mjs`의 구조 계약을 새 모듈 경계에 맞췄다.

## 코드 크기

- `MonitorShell.tsx`: 14,359줄.
- `sourceDrafts.ts`: 89줄.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 6개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 101개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
