# 요청 추적: Responsive workflow layout

- 날짜: 2026-06-05
- 요청 요약: 전체 화면 의존 버튼 배치와 과밀한 한 화면 UI를 개선.
- 결과: 완료
- 주요 산출물:
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/scripts/check-scroll-containers.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-responsive-workflow-layout/`
- 검증: `pnpm run check`, `pnpm test`, `pnpm exec next build`, `pnpm run perf:budget`, localhost HTTP smoke, in-app Browser responsive smoke 통과
- 제외: 기존 generated workspace snapshot 변경분
