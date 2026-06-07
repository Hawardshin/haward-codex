# 2026-06-07 데스크톱 런타임 카탈로그 분리 평가

## 평가

- 요구 충족: 통과.
- TypeScript 분리: 통과. 순수 런타임 카탈로그와 정규화 헬퍼가 `runtimeCatalog.ts`로 이동했다.
- Rust 확인: 통과. 기존 `service_readiness.rs` 분리 경계가 유지되고 `cargo check` 및 패키징 중 Rust 테스트/빌드가 통과했다.
- 패키징 복구: 통과. 내부 `.app`과 `.dmg`가 생성되고 검증됐다.

## 검증 명령

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `cargo check`
- `corepack pnpm run desktop:package:run:internal`

## 남은 리스크

- `MonitorShell.tsx`는 16,563줄로 여전히 크다. 다음 안전한 분리 후보는 `DesktopRuntimePanel` 하위 UI/상태 조립 분리다.
- 공개 배포는 Developer ID 서명, notarization, updater, clean-machine smoke가 아직 gate로 남아 있다.
- 작업트리에 기존 변경이 많아 이번 변경 세트를 안전하게 단독 커밋하지 않았다.
