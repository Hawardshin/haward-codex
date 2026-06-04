# 2026-06-05 Desktop Pipeline Structure Trace

## Request

설치/빌드 개선에 이어 구조 변경도 허용했다.

## Outcome

- `platform-desktop-app/scripts/desktop-pipeline.mjs`는 runner를 호출하는 entrypoint로 축소했다.
- `platform-desktop-app/scripts/desktop-pipeline/paths.mjs`에 repository, Tauri, artifact, prepared build config 경로를 모았다.
- `platform-desktop-app/scripts/desktop-pipeline/definitions.mjs`에 setup, quick verify, full verify, prepared Tauri build, internal package, public report step 정의를 모았다.
- `platform-desktop-app/scripts/desktop-pipeline/runner.mjs`에 dry-run, platform skip, subprocess execution, failure handling을 모았다.
- readiness check와 tests가 새 pipeline structure를 필수 구조로 검사한다.

## Validation

- `corepack pnpm --filter platform-desktop-app run pipeline:dry-run`: passed
- dynamic import smoke for `definitions.mjs` and `runner.mjs`: passed
- `corepack pnpm run desktop:verify:quick`: passed
- `corepack pnpm run desktop:verify`: passed
- `corepack pnpm --filter platform-desktop-app test`: passed
- `corepack pnpm --filter platform-desktop-app run check`: passed

## Notes

- Generated snapshot JSON files remain unstaged build outputs.
- Public release gates remain blocked by signing/notarization, updater, and clean-machine smoke.
