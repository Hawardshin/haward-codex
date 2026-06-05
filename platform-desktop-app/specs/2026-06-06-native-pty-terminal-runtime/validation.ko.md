# 검증 기록

## 현재 통과

- `cargo check` 첫 실행: Rust 오류 1개 확인 후 수정.
- `corepack pnpm --filter workspace-monitor run check` 첫 실행: TypeScript 오류 1개 확인 후 수정.
- 수정 후 `cargo check`: 통과.
- 수정 후 `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`
- `corepack pnpm --dir platform-desktop-app run check`
- `corepack pnpm --dir platform-desktop-app run package:internal`
- `git diff --check`
- JSON validity check for installation registry, product gap registry, runtime contract.

## 내부 패키징 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- `codesign --verify --deep --strict`: 통과.
- `hdiutil verify`: 통과.

## 브라우저/DOM 스모크

- in-app Browser 도구는 현재 스레드에 직접 노출되지 않아 Playwright 대체 검증을 사용했다.
- Next dev server는 고립된 PID가 포트를 열지 않는 상태가 반복되어 정리 후 정적 `out/` HTTP server로 검증했다.
- 정적 snapshot에서는 터미널 런처 rect가 0이라 click smoke는 불안정했다.
- 대체 DOM/CSS smoke는 통과: `terminal-view-switcher`에 `PTY` tab이 있고, `native-pty-terminal-host` CSS rule이 존재하며 drawer 강제 open 상태가 렌더링됐다.

## 남은 경고

- 최종 `platform-desktop-app run check`는 developer public snapshot 복원 후 customer bundle stale 경고를 보고한다.
- 내부 패키징 빌드 안에서는 customer snapshot 재생성과 bundle audit이 경고 없이 통과했다.
- 공개 배포는 기존처럼 Developer ID signing, notarization, updater, clean-machine smoke가 남아 있다.
