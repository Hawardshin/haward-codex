# 2026-06-07 소스 에디터 액션 상태 분리 작업 요약

## 변경

- source editor의 open/select/save/save-all/revert/close 상태 전환을 `sourceDraftActions.ts`로 분리했다.
- `MonitorShell.tsx`는 새 helper 결과를 React state setter에 반영하는 역할로 줄였다.
- 저장 대상 생성, 저장 결과 계산, 저장 report 병합 로직을 공통 helper로 통일했다.
- 테스트용 `import-type-script-module.mjs`가 상대 TS/TSX import/export를 재귀적으로 처리하도록 확장했다.
- source editor 구조 테스트, helper behavior 테스트, Tool Studio 계약 테스트, readiness source structure 집계를 갱신했다.

## 효과

- 소스 에디터의 주요 사용자 액션이 같은 상태 전환 helper를 통과해 더 일관되게 동작한다.
- `MonitorShell.tsx` 안의 draft 상태 계산 중복이 줄었다.
- helper 테스트가 실제 상대 import를 가진 source editor 모듈까지 직접 검증할 수 있게 됐다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 109개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 통과, 8개.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
- 내부 앱 실행은 기존 인스턴스 재사용 모드로 열렸다.
