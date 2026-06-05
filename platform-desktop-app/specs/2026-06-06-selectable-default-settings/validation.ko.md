# 검증 기록

## 통과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app test`
- `corepack pnpm --dir platform-desktop-app run check`
- `corepack pnpm --dir platform-desktop-app run package:internal`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
- 최종 `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- 최종 `corepack pnpm --dir platform-desktop-app run check`
- `git diff --check`

## 내부 패키징 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 브라우저 스모크

- 로컬 개발 서버 `http://127.0.0.1:3210`을 열고 브라우저 연결을 확인했다.
- 페이지 타이틀은 `Workspace Monitor`로 확인됐다.
- 스냅샷 로더가 `Loading workspace snapshot` 상태에 머물러 새 UI 본문까지 시각 확인하지는 못했다.
- 콘솔 오류는 없었고, 개발 서버와 브라우저 탭은 정리했다.

## 남은 경고

- 최종 `platform-desktop-app run check`는 개발용 public snapshot 복원 후 customer bundle stale 경고를 보고한다.
- 내부 패키징 빌드 안에서는 customer snapshot 재생성과 bundle audit이 경고 없이 통과했다.
- 공개 배포는 기존과 같이 Developer ID signing, notarization, updater, clean-machine smoke가 남아 있다.
