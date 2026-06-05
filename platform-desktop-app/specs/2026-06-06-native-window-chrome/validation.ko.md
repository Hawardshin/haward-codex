# 네이티브 창 크롬 활용 검증

## 예정 검증

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor check`
- `corepack pnpm --filter platform-desktop-app check`
- Browser DOM/CSS smoke:
  - `.desktop-titlebar` has `data-tauri-drag-region="deep"`
  - `.desktop-titlebar` computed `-webkit-app-region` is `drag`
  - `.titlebar-actions` and `.titlebar-search` computed `-webkit-app-region` are `no-drag`
  - document has no horizontal overflow
- `corepack pnpm run desktop:package:internal`

## 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 63 tests passed.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 24 tests passed.
- `corepack pnpm --filter workspace-monitor run collect`: 통과, developer public snapshot 생성.
- `corepack pnpm --filter workspace-monitor check`: 통과.
  - `lazy_boundary_contract_ok`
  - `scroll_contract_ok`
  - `source_control_design_ok`
  - `history_payload_ok`
- `corepack pnpm --filter platform-desktop-app check`: 통과.
  - `installer_shell_runtime_contract_ready`
  - `desktop_product_structure_ready_public_release_gated`
  - `customer_bundle_ready`
  - `internal_release_preflight_ready`
  - `service_internal_ready_public_blocked`
- Browser DOM/CSS smoke: 통과.
  - overview: `.desktop-titlebar` `data-tauri-drag-region="deep"`, computed app region `drag`
  - source: `.titlebar-actions`, `.titlebar-search`, `.titlebar-context-strip`, search input, action button computed app region `no-drag`
  - source: `horizontalOverflow = 0`
- `corepack pnpm run desktop:package:internal`: 통과.
  - `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
  - `codesign --verify --deep --strict`: 통과
  - `hdiutil verify`: VALID

## 공개 배포 주의

- internal package build는 ad-hoc signing으로 완료했다.
- public release notarization/signing/updater 자격 증명은 여전히 별도 public release gate다.
