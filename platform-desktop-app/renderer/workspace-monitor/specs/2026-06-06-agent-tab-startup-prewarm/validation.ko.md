# 검증

## 완료

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 72 tests
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- `node scripts/audit-section-switch-latency.mjs http://127.0.0.1:3010/#section-overview`: 통과, p95 1413.4ms under 6x CPU throttle
- Static browser smoke: ready 3948ms, Agent switch 244ms, 12 mounted sections
- Dev browser smoke: ready 4702ms, Agent switch 219ms, 12 mounted sections
- Codex in-app Browser smoke: ready true, active overview, 12 mounted sections

## Packaging

- `corepack pnpm run desktop:package:internal`: 통과
- 생성:
  - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- `codesign --verify --deep --strict`: 통과
- `hdiutil verify`: 통과
