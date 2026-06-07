# 2026-06-07 소스 에디터 세션 훅 분리 작업 요약

## 변경

- `useSourceEditorSession.ts`를 추가해 source editor의 Monaco ref, active path ref, draft ref, draft sync timer를 한 hook으로 묶었다.
- `MonitorShell.tsx`에서 inline `applySourceEditorVisibleState`, `updateSourceDraft`, `currentEditorDraftContent`, `effectiveSourceDrafts`, draft sync timer 관리 코드를 제거했다.
- 저장, 전체 저장, 되돌리기 경로가 hook의 `getActiveSourcePath`와 `setVisibleSourceDraftContent`를 사용하도록 바뀌었다.
- source editor barrel export, readiness source map, 구조 계약 테스트, Tool Studio 계약 테스트를 새 hook 경계에 맞춰 갱신했다.

## 효과

- source editor 세션 상태 관리가 하나의 hook에 모여 저장/로드/닫기 액션이 같은 active path와 draft ref 경계를 공유한다.
- `MonitorShell.tsx`는 source editor 세션 lifecycle 세부 구현을 직접 소유하지 않는다.
- pending draft sync timeout cleanup이 hook 안에 있어 resource lifecycle이 더 명확하다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 11개.
- `node --test tests/tool-studio.test.mjs`: 통과, 54개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 110개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 통과, 8개.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
- 최종 `git diff --check` 통과, DMG mount 없음, 3217 개발 서버 없음, 내부 앱 프로세스 1개 확인.
