# 검증: Agent CLI Cockpit

## 실행한 검증

- `git diff --check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter workspace-monitor run build`
- Playwright static smoke against `http://127.0.0.1:3238`
- `corepack pnpm run desktop:package:internal`

## 결과

- workspace-monitor test: 66개 통과.
- workspace-monitor check: lazy boundary, scroll contract, source control design, history payload 통과.
- platform-desktop-app test: 24개 통과.
- platform-desktop-app check: internal readiness 통과, public signing/updater/clean-machine smoke는 공개 배포용 경고로 남음.
- performance budget: `within_budget`, largest initial chunk `734386` bytes, limit `1000000`.
- renderer build: Next static build 통과.
- Playwright smoke: cockpit title, 5 adapter cards, 3 pattern items, horizontal overflow 0 확인.
- internal package build: `.app`와 `.dmg` 생성, codesign verify와 `hdiutil verify` 통과.

## 생성물

- 앱: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- 스크린샷: `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-06-agent-cli-cockpit-desktop.png`

## 제한

- 공개 배포 readiness는 Developer ID signing, notarization, updater signing/endpoint, clean-machine smoke가 없어 아직 blocked다.
- Browser plugin callable surface가 없어 local static server와 Playwright로 시각 smoke를 대체했다.
