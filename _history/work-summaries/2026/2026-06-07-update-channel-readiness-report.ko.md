# 2026-06-07 update channel readiness report 작업 요약

## 변경

- `platform-desktop-app/src-tauri/src/features/service_readiness.rs`에 `ServiceUpdateChannelReport`와 `service_update_channel_report`를 추가했다.
- Runtime resource directory에서 `service-update-channel.json`, `latest.json`, `updater.json`, `update-manifest.json` 후보를 확인하고 valid JSON marker만 configured로 보고한다.
- `ServiceReadinessReport`에 `updateChannel`을 추가했다.
- `platform-desktop-app/renderer/workspace-monitor/types/desktop.ts`에 update channel 타입을 추가했다.
- `MonitorShell.tsx` Service Readiness 패널에 update channel card를 추가했다.
- `globals.css`, `check-readiness.mjs`, `tests/readiness.test.mjs`를 새 기능 계약에 맞게 갱신했다.

## 결과

- 준비도 점검 실행 시 update channel 상태가 화면에 구조화되어 보인다.
- 내부 build에서는 marker가 없으면 missing/warning으로 보이고, public build marker가 번들되면 channel, endpoint count, public key hash, static manifest 상태가 표시될 수 있다.
- private updater key 또는 Apple credential은 표시하지 않는다.

## 검증

- `cargo check`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 90개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app test`: 30개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm run desktop:package:run:internal`: 최종 실행 예정.
