# 2026-06-05 Desktop Install Build Pipeline Trace

## Request

설치와 빌드 방법 자체를 바꿔도 된다는 허용을 바탕으로, 느린 설치/빌드 경로를 근본적으로 개선한다.

## Outcome

- root command를 setup, quick verify, full verify, renderer build, internal package로 분리했다.
- `desktop:setup`은 pnpm filter로 `platform-desktop-app`와 `workspace-monitor`만 설치 대상으로 잡고 Playwright Chromium headless shell 설치를 setup 단계로 이동했다.
- `renderer:build`를 customer renderer build/audit의 명시적 이름으로 만들고 `monitor:build`는 compatibility alias로 유지했다.
- Tauri direct build는 `beforeBuildCommand`로 renderer build/audit를 계속 실행한다.
- internal package pipeline은 `tauri-before-build-prepared.mjs` 훅으로 이미 만든 customer bundle을 audit한 뒤, Next.js build를 다시 돌리지 않고 Tauri package를 만든다.

## Validation

- `node -e` package/config JSON parse: passed
- `corepack pnpm --filter platform-desktop-app run pipeline:dry-run`: passed
- `corepack pnpm run desktop:setup`: passed, scope 2 of 4 workspace projects
- `corepack pnpm run desktop:verify:quick`: passed
- `corepack pnpm run desktop:verify`: passed
- `corepack pnpm run desktop:package:internal`: passed, `.app` and DMG produced, `codesign` and `hdiutil verify` passed

## Remaining Gates

- Public signing/notarization credentials are still not configured.
- Signed updater endpoint/key is still not configured.
- Clean-machine install/open/update/uninstall smoke is still pending.
