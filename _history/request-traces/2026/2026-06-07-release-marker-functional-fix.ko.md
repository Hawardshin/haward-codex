# 2026-06-07 요청-결과 추적: release marker 기능 이슈

## 요청

- 기능적 이슈 구현.

## 결과

- public release preflight가 runtime update-channel marker와 generated bundle resource mapping을 정확히 검사하도록 수정했다.
- 코드로 해결 가능한 false blocker를 제거했고, 외부 자격증명/endpoint gate는 그대로 남겼다.

## 변경 파일

- `platform-desktop-app/scripts/check-release-readiness.mjs`
- `platform-desktop-app/tests/customer-bundle.test.mjs`

## 검증 연결

- `corepack pnpm --filter platform-desktop-app test`
- `node scripts/check-release-readiness.mjs --mode public --report-only`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm run desktop:package:run:internal`

## 남은 항목

- public distribution은 Developer ID signing, notarization, updater key/endpoint, release asset URL, clean-machine smoke 없이는 완료로 볼 수 없다.
