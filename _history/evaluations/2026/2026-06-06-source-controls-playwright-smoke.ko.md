# 평가: 소스 컨트롤 Playwright 스모크

## 결과

- 이전의 dev 서버 Playwright 검증 실패를 그대로 두지 않고, dev 서버와 static export 경로를 분리했다.
- Tauri가 임베드하는 static export 산출물을 기준으로 실제 Chromium 클릭 검증을 추가했다.
- 개발자 snapshot에서는 소스 파일 선택 드롭다운이 네이티브 `<select>` 없이 열리고 80개 파일 항목을 보여준다.
- customer snapshot은 의도적으로 소스 파일이 제거되어 파일 선택 트리거가 비활성화된다. 이 상태는 고객 번들 안전성의 결과이며, 개발자 기능 검증은 developer snapshot을 주입한 static smoke로 수행한다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run smoke:source-controls`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 55개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과, `.app`/`.dmg` 생성과 검증 완료.
- `corepack pnpm --dir platform-desktop-app run check`: 통과.

## 제한

- Next dev 서버 Playwright 경로는 이 환경에서 fetch/useEffect가 시작되지 않았다. 이번 회귀 검증은 실제 패키징 경로인 static export를 기준으로 고정했다.
- public release readiness는 이번 작업 범위가 아니다. 기존 signing, notarization, updater, clean-machine smoke gate가 계속 남아 있다.
