# 검증: Workspace Monitor 탭 전환과 소스 편집 UX

## 명령

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 55개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`: 통과, 22개 테스트.
- `corepack pnpm --dir platform-desktop-app check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과, Next production build, customer bundle audit, Rust test/build, Tauri `.app`/`.dmg`, codesign verify, DMG verify 성공.

## 브라우저 스모크

- 이번 추가 수정에서 인앱 브라우저 MCP는 호출 가능한 도구로 노출되지 않았다.
- Playwright로 `http://127.0.0.1:4210` 개발 서버를 열었으나 Next dev 화면이 `Loading workspace snapshot` 상태에서 클라이언트 snapshot fetch를 시작하지 않아 소스 드롭다운 DOM까지 도달하지 못했다.
- 대신 정적 계약 테스트가 `source-file-picker-trigger`, `source-file-picker-menu`, 공용 Button/ActionGroup 사용, `selectedSourcePath` native select 부재를 검증했다.

## 제한

- Playwright dev 서버 스모크는 Next dev hydration/fetch 제한으로 완료하지 못했다. 최종 패키지 빌드와 codesign/DMG 검증은 성공했다.
