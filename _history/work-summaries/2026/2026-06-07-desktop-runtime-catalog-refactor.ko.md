# 2026-06-07 데스크톱 런타임 카탈로그 분리 작업 요약

## 변경

- `platform-desktop-app/renderer/workspace-monitor/components/features/runtimeCatalog.ts`를 추가했다.
- `MonitorShell.tsx`에 있던 공급자 표시명, CLI 어댑터 기본값, 설정 가이드, 공급자 credential fallback, provider-adapter 매핑, 터미널 quick command 기본값, 런타임 커스터마이징 기본값, 런타임 설정 정규화 헬퍼를 새 파일로 이동했다.
- `tool-studio.test.mjs`, `scripts/check-readiness.mjs`, `tests/readiness.test.mjs`가 새 런타임 카탈로그 파일을 계약 소스로 포함하도록 업데이트했다.
- `scripts/check-readiness.mjs`의 필수 파일 목록에 `runtimeCatalog.ts`를 추가했다.

## 결과

- `MonitorShell.tsx` 라인 수는 16,563줄이다.
- 새 `runtimeCatalog.ts`는 344줄이다.
- 기존 `types/desktop.ts`, `service_readiness.rs`, 공급자/런타임 패널 분리 경계와 함께 더 작은 소유 단위를 형성한다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 90개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app test`: 30개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `cargo check`: 통과.
- `corepack pnpm run desktop:package:run:internal`: 내부 앱/DMG 빌드, 서명 검증, DMG 검증, 내부 앱 열기 통과.
