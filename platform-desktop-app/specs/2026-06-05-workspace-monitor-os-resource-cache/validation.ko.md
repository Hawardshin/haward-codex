# 검증: Workspace Monitor OS 자원 기반 워크스페이스 캐시

## 명령 결과

- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml --check`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 54개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`: 통과, 22개 테스트.
- `corepack pnpm --dir platform-desktop-app check`: 통과. 내부 readiness 통과, 공개 배포는 signing/notarization/updater/clean-machine smoke gate가 계속 남아 있음.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 패키지 빌드 후 개발용 public snapshot 복원.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check:history-payload`: 통과.

## 내부 패키지 산출물

- `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 패키징 메모

- local/internal build는 ad-hoc identity `-`로 signing했고 `codesign --verify --deep --strict`가 통과했다.
- `hdiutil verify`가 DMG checksum valid를 보고했다.
- public notarization은 `APPLE_ID`/`APPLE_PASSWORD`/`APPLE_TEAM_ID` 또는 API key 환경 변수가 없어 스킵됐다. 이는 기존 public release gate로 유지된다.
