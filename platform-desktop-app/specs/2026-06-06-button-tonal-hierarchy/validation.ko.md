# 검증 기록

## 통과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `git diff --check`
- `corepack pnpm --dir platform-desktop-app test`
- `corepack pnpm --dir platform-desktop-app run check`
- `corepack pnpm --dir platform-desktop-app run package:internal`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`

## 내부 패키징 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 브라우저 스모크

- `http://127.0.0.1:3210`을 인앱 브라우저에서 열었다.
- 타이틀은 `Workspace Monitor`로 확인됐다.
- 본문은 `Loading workspace snapshot` 상태에 머물러 실제 버튼 본문 시각 확인은 제한됐다.
- 브라우저 콘솔 오류는 없었다.
- 브라우저 탭과 dev server는 정리했다.

## 남은 경고

- 내부 패키징은 notarization 자격 증명이 없어 notarization을 건너뛴다. 기존 내부 빌드 경로의 예상 동작이다.
- 공개 배포는 기존과 같이 Developer ID signing, notarization, updater, clean-machine smoke가 남아 있다.
