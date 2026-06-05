# 요청-결과 추적: Scroll Scope Color Speed

## 요청 요약

- 사용자는 스크롤을 범위별로 나누고, 화면 색상을 단정하면서도 세련되게 정리하며, 버튼/탭/스크롤 상호작용의 느려짐을 줄이라고 요청했다.

## 결과

- `REQ-WM-070`을 추가해 scope-separated scrolling, restrained scrollbar color, offscreen animation pause를 요구사항으로 기준화했다.
- `globals.css`에 scoped scroll token, stable scrollbar gutter, overscroll containment, 제한된 paint containment를 추가했다.
- `ToolStudioPanel.tsx`의 3D canvas가 화면 밖, 문서 숨김, reduced-motion 상황에서 frame loop를 멈추도록 변경했다.
- scroll/color/static tests와 check script를 갱신했다.

## 산출물

- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-scroll-scope-color-speed/`
- 평가: `_history/evaluations/2026/2026-06-05-scroll-scope-color-speed.ko.md`
- 스크린샷:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-scroll-scope-color-speed-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-scroll-scope-color-speed-mobile.png`

## 검증

- `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 통과
- Browser/Playwright smoke 통과

## 제외

- generated snapshot JSON은 build 과정에서 갱신됐지만 이번 의미 있는 변경 집합에서는 제외했다.
