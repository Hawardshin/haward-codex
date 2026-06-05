# 요청-결과 추적: 소스 컨트롤 Playwright 스모크

## 요청

사용자는 이전 검증 한계 설명을 받아들이지 않고, 가능한 데스크톱/운영체제 자원을 사용해 소스 컨트롤 불편함과 기본 드롭다운 문제를 끝까지 검증하라고 요구했다.

## 결과

- 원인 분리: Next dev 서버 Playwright 경로에서는 snapshot fetch가 시작되지 않아 `Loading workspace snapshot`에 머물렀다.
- 실제 산출물 검증: Tauri가 임베드하는 `out/` 정적 export를 로컬 static server로 띄워 소스 화면 렌더링을 확인했다.
- 개발자 데이터 검증: developer snapshot을 주입한 static export에서 source dropdown이 열리고 80개 파일 항목이 표시됨을 확인했다.
- 회귀 방지: `smoke:source-controls`를 추가해 동일 검증을 반복 실행 가능하게 만들었다.
- 빌드 완료: 내부 `.app`/`.dmg` 패키징과 DMG checksum 검증까지 완료했다.

## 주요 파일

- `platform-desktop-app/renderer/workspace-monitor/scripts/check-source-controls-playwright.mjs`
- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증 명령

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run smoke:source-controls`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app run package:internal`
- `corepack pnpm --dir platform-desktop-app run check`
