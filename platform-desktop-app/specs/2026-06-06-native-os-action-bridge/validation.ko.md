# Validation: Native OS Action Bridge

## 실행한 검증

- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과
- `pnpm --dir platform-desktop-app test`: 통과
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과
- `pnpm --dir platform-desktop-app check`: 통과
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 1차는 customer snapshot 상태로 실패, `collect` 후 재실행 통과
- `pnpm --dir platform-desktop-app package:internal`: 통과, macOS `.app` 서명 검증 및 `.dmg` checksum verify 통과

## 주의

실제 Finder/Terminal 창을 여는 수동 smoke는 자동 검증에서 제외했다. 자동 테스트는 명령 등록, allowlist, command plan, UI 버튼 토큰을 확인한다.
