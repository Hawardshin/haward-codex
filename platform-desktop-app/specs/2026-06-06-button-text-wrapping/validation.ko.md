# Validation: Button Text Wrapping

## 완료된 검증
- `corepack pnpm --filter workspace-monitor test`: 통과, 84개 테스트.
- 새 회귀 테스트: `Action button labels stay single-line and truncate instead of stretching controls`.
- 갱신 테스트: `text wrapping contract separates prose, controls, and long tokens`.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- Browser smoke, viewport 1280x800:
  - source command toolbar button: `whiteSpace=nowrap`, `overflow=hidden`, `textOverflow=ellipsis`, 대표 높이 `39.4px`.
  - source command toolbar label span: `whiteSpace=nowrap`, `overflow=hidden`, `textOverflow=ellipsis`, `overflowWrap=normal`, 대표 높이 `14.18px`.
  - 공용 `ui-button` span: `whiteSpace=nowrap`, `overflow=hidden`, `textOverflow=ellipsis`.
  - agent CLI command label span: `whiteSpace=nowrap`, `overflow=hidden`, `textOverflow=ellipsis`, `overflowWrap=normal`.
  - console error count: `0`.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 27개 테스트.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. 공개 배포 signing/notarization/updater/clean-machine smoke 경고는 기존 public release gate로 유지.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.
  - `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
  - `codesign --verify --deep --strict`: 통과.
  - `hdiutil verify`: 통과.
- package 후 `corepack pnpm --filter workspace-monitor run collect -- --best-effort` 및 `corepack pnpm --filter workspace-monitor run check`: 통과.
