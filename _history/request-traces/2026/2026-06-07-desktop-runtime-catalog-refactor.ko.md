# 2026-06-07 데스크톱 런타임 카탈로그 분리 요청 추적

## 요청

- 데스크톱 패키징 실패 수정 이후 구현을 계속 진행.
- 큰 Rust/TypeScript 파일을 더 나누고 검증.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/features/runtimeCatalog.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 검증 연결

- TypeScript: `workspace-monitor run check`, `workspace-monitor test`, `platform-desktop-app run check`.
- Rust: `cargo check`, 전체 패키징 중 `cargo test` 및 `cargo build`.
- 패키징: `desktop:package:run:internal`.

## 결과

- 패키징 실패 원인이었던 `refreshProviderCredentials` 경계는 이전 작업에서 복구됐고, 이번 작업은 런타임 카탈로그 분리까지 확장했다.
- 내부 앱과 DMG 산출물이 생성 및 검증됐다.

## 커밋 상태

- 작업트리에 기존의 관련 없는 수정/미추적 파일이 많아 자동 커밋/푸시는 수행하지 않았다.
