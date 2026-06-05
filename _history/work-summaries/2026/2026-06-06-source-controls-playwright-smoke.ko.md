# 작업 요약: 소스 컨트롤 Playwright 스모크

## 변경

- `workspace-monitor`에 `smoke:source-controls` 스크립트를 추가했다.
- 스모크는 `out/` 정적 export를 임시 디렉터리에 복사하고 개발자 snapshot을 주입한 뒤 Chromium에서 소스 화면을 연다.
- 스모크는 네이티브 `<select>` 제거, 공용 버튼 프리미티브 수, 파일 선택 트리거 활성화, 메뉴 오픈, 파일 항목 수, 컨트롤 크기, 페이지 에러 부재를 확인한다.
- 기존 `tool-studio.test.mjs`가 새 스모크 스크립트와 핵심 검증 토큰을 고정하도록 보강했다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run smoke:source-controls`: 통과, 80개 파일 항목 확인.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 55개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과, `.app`/`.dmg` 생성과 codesign/hdiutil 검증 완료.
- `corepack pnpm --dir platform-desktop-app run check`: 통과. 개발자 snapshot 복구 상태라 customer bundle 감사의 stale public snapshot 경고만 남았다.

## 산출물

- 내부 앱: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- 스모크 스크린샷: `outputs/workspace-monitor-source-controls-smoke.png`
