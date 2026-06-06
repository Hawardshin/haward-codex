# 작업 요약: Sidebar Navigation Componentization

- 날짜: 2026-06-07
- 커밋: 대기 중
- 요청: 미뤘던 구현 계속 진행

## 결과

- `MonitorShell` 내부 좌측 activity rail/sidebar navigation을 `DesktopActivityRail` 컴포넌트로 분리했다.
- renderer test, platform test, readiness script가 새 컴포넌트 파일을 직접 검증하도록 갱신했다.
- 제품 gap 레지스트리에 이번 구조 분리 증거를 추가했다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm --dir platform-desktop-app test`: 통과, 30 tests
- Playwright smoke: activity rail DOM 렌더링 확인
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과
- `corepack pnpm -w run desktop:renderer:build`: 통과
- `corepack pnpm --dir platform-desktop-app run check`: 통과, 기존 public release gate 경고 유지
