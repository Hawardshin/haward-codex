# Runtime Run Timeline 검증

## 결과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec tsc --noEmit`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 첫 실행은 새 history/snapshot 반영 전이라 `check-history-payload`에서 실패. `collect` 재실행 후 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect`: developer snapshot 재생성 통과.
- `corepack pnpm --dir platform-desktop-app run test`: 24개 테스트 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build:customer`: 통과.
- `corepack pnpm --dir platform-desktop-app run check`: internal readiness 통과. 공개 release는 기존과 동일하게 signing/notarization/updater/clean-machine smoke가 gate로 남아 있다.
- Browser smoke: 정적 customer build를 로컬 서버로 열고 `CLI 오케스트레이션` > `실행 기록과 결정함`에서 `Run Timeline`/`작업 실행 타임라인` 패널이 raw terminal output보다 먼저 표시되는 것을 확인했다.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 내부 `.app`와 `.dmg` 생성, `codesign --verify --deep --strict`, `hdiutil verify` 통과.

## 발견과 보강

- `build:customer` 뒤에는 public snapshot이 customer mode로 남아 다음 `package:internal`의 첫 `workspace-monitor check`가 developer admin-history 계약에서 실패할 수 있었다.
- `scripts/desktop-pipeline/definitions.mjs`에 `Workspace Monitor developer snapshot collect` 단계를 추가해 `verify-quick`, `verify`, `package-internal`, `package-public`의 common verification 경로가 시작할 때 developer snapshot을 자체 준비하도록 수정했다.
- `tests/readiness.test.mjs`와 `scripts/readiness/desktop-build-pipeline.mjs`에 이 계약을 추가해 빌드 순서 문제 재발을 막았다.

## 산출물

- 내부 앱: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
