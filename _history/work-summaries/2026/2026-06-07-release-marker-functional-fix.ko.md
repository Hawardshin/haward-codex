# 2026-06-07 release marker 기능 이슈 구현 요약

## 변경

- `platform-desktop-app/scripts/check-release-readiness.mjs`에서 `src-tauri/src/features/service_readiness.rs`를 release preflight 검사 source에 포함했다.
- public generated Tauri config가 `target/public-release/service-update-channel.json`을 `service-update-channel.json` resource로 번들링하는지 확인하는 `publicUpdateChannelMarkerBundled` 검사를 추가했다.
- `platform-desktop-app/tests/customer-bundle.test.mjs`에 public preflight가 `Bundled service-update-channel marker is checked at runtime` 항목을 passed로 보고, blocker에 남기지 않는지 확인하는 테스트를 추가했다.

## 결과

- public preflight에서 update-channel marker blocker가 제거됐다.
- 남은 public blockers는 외부 입력이 필요한 signing, notarization, updater signing key/public key, endpoint, release asset URL이다.

## 검증

- `corepack pnpm --filter platform-desktop-app test`: 30개 테스트 통과.
- `node scripts/check-release-readiness.mjs --mode public --report-only`: marker check passed, 외부 release inputs만 blocked.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- 최종 close-out으로 `corepack pnpm run desktop:package:run:internal` 실행.
