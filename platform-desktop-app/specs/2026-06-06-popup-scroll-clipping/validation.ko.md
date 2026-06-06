# Validation: Popup Scroll Clipping

## 완료된 검증
- `corepack pnpm --filter workspace-monitor test`: 통과, 83개 테스트.
- 새 회귀 테스트: `Popup menus escape scroll panes and keep their own bounded scroll`.
- Browser smoke, viewport 900x520:
  - Tool Studio primary menu: `top=281`, `bottom=504`, `height=223`, `viewportHeight=520`, `inViewport=true`, `zIndex=140`, `maxHeight=223.122px`, `overflowY=auto`, `overscrollBehavior=contain`, `portalWrapped=true`.
  - Source file picker after scrolling trigger into view: `top=16`, `bottom=232`, `height=216`, `viewportHeight=520`, `inViewport=true`, `zIndex=140`, `maxHeight=216.094px`, `overflowY=auto`, `overscrollBehavior=contain`, `portalWrapped=true`.
- `corepack pnpm --filter workspace-monitor run smoke:source-controls`: 통과. `sourceSelectCount=0`, `itemCount=23`, `pageErrors=[]`; WebGL `ReadPixels` performance warning만 관찰.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 27개 테스트.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. 공개 배포 signing/notarization/updater/clean-machine smoke 경고는 기존 public release gate로 유지.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.
  - `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
  - `codesign --verify --deep --strict`: 통과.
  - `hdiutil verify`: 통과.
- package 후 `corepack pnpm --filter workspace-monitor run collect -- --best-effort` 및 `corepack pnpm --filter workspace-monitor run check`: 통과.

## 2026-06-06 후속 오버레이 검증
- `corepack pnpm --filter workspace-monitor test`: 통과, 85개 테스트.
- `corepack pnpm --filter workspace-monitor check`: 통과.
- Browser smoke, viewport 1280x720:
  - Settings dialog: portal parent `.desktop-app-root theme-system`, backdrop `0..720`, dialog `top=16.88`, `bottom=691.12`, `withinViewport=true`, initial focus `설정 닫기`.
  - Command palette: portal parent `.desktop-app-root theme-system`, backdrop `0..720`, dialog `top=66`, `bottom=611.85`, `withinViewport=true`, initial focus search input.
  - Terminal drawer: portal parent `.desktop-app-root theme-system`, backdrop `0..720`, drawer `top=64`, `bottom=720`, `opacity=1`, `transform=0`, `withinViewport=true`, initial focus `접기`.
  - Operator Center: portal parent `.desktop-app-root theme-system`, backdrop `0..720`, dialog `top=16.88`, `bottom=691.12`, `withinViewport=true`, initial focus `운영 센터 닫기`.
- `corepack pnpm run desktop:renderer:build`: 통과.
- `corepack pnpm run desktop:package:internal`: 통과.
  - `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
  - `codesign --verify --deep --strict`: 통과.
  - `hdiutil verify`: 통과.
- `corepack pnpm run desktop:run:internal`: `internal_app_opened`.
