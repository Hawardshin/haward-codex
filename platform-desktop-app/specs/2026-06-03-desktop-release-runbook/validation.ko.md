# 데스크톱 릴리즈 Runbook과 원샷 명령 검증

## 검증

- `corepack pnpm --filter platform-desktop-app run pipeline:dry-run` 통과
- `corepack pnpm run desktop:verify` 통과
- `corepack pnpm run desktop:release:report` 통과
- `corepack pnpm run desktop:package:internal` 통과
- `codesign --verify --deep --strict "platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app"` 통과
- `hdiutil verify "platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg"` 통과
- `corepack pnpm --filter platform-desktop-app test` 통과
- `corepack pnpm --filter platform-desktop-app run check` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-omission-input.json` 통과: `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-resource-input.json` 통과: `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-cli-pipeline.json` 통과: `pipeline_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-evaluation-input.json` 통과: `ready_to_close`
- `git diff --check` 통과

## 결과

- 내부 테스트용 `.app`와 DMG가 생성됐다.
- 공개 배포 report는 `public_release_blocked`를 유지한다.
- blocking gate는 Developer ID 또는 동등 signing identity, Apple notarization credentials, signed updater channel, clean-machine smoke다.
