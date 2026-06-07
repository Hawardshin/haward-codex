# 2026-06-07 source workbench controller hook 리소스 점검

## 리소스 위험

- source workbench는 Tauri invoke, Monaco editor ref, draft sync timer, async file load gate를 다룬다.
- stale async load와 save-time mutation lock이 깨지면 사용자가 다른 파일을 열거나 저장하는 중에 잘못된 draft가 덮일 수 있다.

## 방어 장치

- `useSourceLoadRequestGate`를 유지하고 controller hook에서 load/AGENTS.md 준비 stale 결과를 무시한다.
- save-time editor lock과 visible draft 보존 helper를 기존 pure helper로 유지한다.
- unmount cleanup은 `useSourceEditorSession`의 timer cleanup에 남긴다.

## 확인 결과

- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 111개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 통과, 8개.
- macOS `.app` codesign verify와 DMG `hdiutil verify`: 통과.
- 내부 앱 실행은 `reuse_existing_instance` 모드로 열렸다.
- Agent Workspace Platform DMG mount는 남지 않았다.
- 3217 개발 서버는 남지 않았다.
- 내부 앱 프로세스는 1개만 확인했다.
