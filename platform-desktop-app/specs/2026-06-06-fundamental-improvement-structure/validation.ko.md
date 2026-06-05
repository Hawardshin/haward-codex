# 검증 계획

| 검증 | 목적 | 상태 |
| --- | --- | --- |
| `corepack pnpm --filter workspace-monitor test` | collector model과 sanitizer 검증 | passed: 65 tests |
| `corepack pnpm --filter workspace-monitor exec tsc --noEmit` | TypeScript snapshot/UI 타입 검증 | passed |
| `corepack pnpm --filter platform-desktop-app test` | desktop readiness token 검증 | passed: 24 tests |
| `corepack pnpm --filter workspace-monitor run collect && corepack pnpm --filter workspace-monitor run check` | generated snapshot과 payload gate 검증 | passed: `history_payload_ok`, 1,606,800 bytes |
| Browser static smoke | Product Structure UI 렌더링과 overflow 확인 | passed: 4 principle cards, 3 package cards, no overflow |
| `corepack pnpm run desktop:package:internal` | 최종 내부 앱 패키징 | passed: `.app`, `.dmg`, `codesign --verify`, `hdiutil verify` |
