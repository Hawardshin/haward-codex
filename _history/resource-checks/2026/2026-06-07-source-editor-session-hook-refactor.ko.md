# 2026-06-07 소스 에디터 세션 훅 분리 리소스 체크

## 리소스 영향

- 새 장기 실행 서버 없음.
- 새 외부 프로세스, watcher, 네트워크 연결 없음.
- 새 hook은 Monaco editor instance ref와 draft sync timeout을 소유한다.
- hook unmount cleanup에서 pending draft sync timeout을 해제한다.

## 확인

- `node --test tests/source-editor-templates.test.mjs`: 통과, 11개.
- `node --test tests/source-editor-helper-behavior.test.mjs`: 통과, 4개.
- `node --test tests/tool-studio.test.mjs`: 통과, 54개.
- `node --test tests/readiness.test.mjs`: 통과, 15개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 110개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- 패키징 중 Rust `cargo test`: 통과, 8개.
- macOS `.app` codesign 검증 통과.
- DMG `hdiutil verify`: 통과.
- 내부 앱 실행 모드: `reuse_existing_instance`.
- `git diff --check`: 통과.
- Agent Workspace Platform DMG mount: 없음.
- `lsof -ti tcp:3217`: 없음.
- `pgrep -fl agent-workspace-platform-desktop`: 1개 프로세스.
