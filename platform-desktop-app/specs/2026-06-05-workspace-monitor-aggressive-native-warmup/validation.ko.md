# 검증: Workspace Monitor 공격적 네이티브 메모리 워밍

## 명령 결과

- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml --check`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 54개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`: 통과, 22개 테스트.
- `corepack pnpm --dir platform-desktop-app check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.

## 내부 패키지 산출물

- `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 패키징 메모

- local/internal build는 ad-hoc identity `-`로 signing했고 `codesign --verify --deep --strict`가 통과했다.
- `hdiutil verify`가 DMG checksum valid를 보고했다.
- public notarization은 Apple 자격 증명이 없어 스킵됐다.
