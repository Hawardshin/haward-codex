# 2026-06-07 데스크톱 provider/action feedback 분리 작업 요약

## 변경

- `platform-desktop-app/src-tauri/src/features/providers.rs`에 provider credential, subscription, model catalog, direct provider task 실행 구현을 이동했다.
- `platform-desktop-app/src-tauri/src/lib.rs`는 Tauri invoke 명령 래퍼와 공용 런타임 구조를 유지하고 provider 구현 호출만 위임하도록 정리했다.
- `platform-desktop-app/renderer/workspace-monitor/components/features/DesktopActionFeedbackCard.tsx`를 추가해 desktop action feedback UI와 상태 라벨을 분리했다.
- `MonitorShell.tsx`는 새 action feedback 컴포넌트를 import해 quick-start와 command-palette 피드백 렌더링을 위임한다.
- provider 모듈 분리와 action feedback 컴포넌트 분리를 반영하도록 readiness/test 스크립트를 업데이트했다.

## 결과

- `MonitorShell.tsx`: 15,372줄.
- `src-tauri/src/lib.rs`: 11,092줄.
- `src-tauri/src/features/providers.rs`: 1,732줄.
- `DesktopActionFeedbackCard.tsx`: 107줄.

## 검증

- `cargo check`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 90개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app test`: 30개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm run desktop:package:run:internal`: 내부 앱/DMG 빌드 및 실행 검증 예정 기록 후 최종 실행.
