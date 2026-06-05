# Shared Workspace Resource Cache 검증

## 실행 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec tsc --noEmit`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect`: 통과, developer snapshot 생성.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 68개 테스트.
- `corepack pnpm --dir platform-desktop-app run test`: 통과, 24개 테스트.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`: 통과, self-documenting.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build:customer`: 통과.
- Browser smoke against `http://127.0.0.1:48219/`: 통과. 주요 레일에서 `CLI 오케스트레이션`, `루트 툴/파일`, `에이전트 코어` 전환 확인.
- `node platform-desktop-app/renderer/workspace-monitor/scripts/audit-section-switch-latency.mjs http://127.0.0.1:48219/ --runs=3`: 통과. `settleAverageMs=321.3`, `settleP95Ms=735.7`, `longTaskMaxMs=548`, `longTaskTotalP95Ms=548`, resident/mounted panel 최대 5.
- `corepack pnpm --dir platform-desktop-app run check`: 통과. public release credential 관련 warning은 내부 패키징 blocker가 아니다.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과. 내부 macOS `.app`와 `.dmg` 생성, `codesign --verify --deep --strict`, `hdiutil verify` 통과.

## 결과

- 통과.

## 패키지 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
