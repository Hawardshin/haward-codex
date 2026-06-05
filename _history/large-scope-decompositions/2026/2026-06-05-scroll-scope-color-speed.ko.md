# 대범위 분해 기록: Scroll Scope Color Speed

## 분류

- 요청 유형: UI/UX/성능 개선
- 큰 요청 묶음: 스크롤 범위 분리, 색상 정리, 속도 개선
- 이번 slice: Workspace Monitor의 scroll scope contract, scrollbar color token, offscreen 3D pause

## Source Inventory

- CSS: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 컴포넌트: `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- 검사: `platform-desktop-app/renderer/workspace-monitor/scripts/check-scroll-containers.mjs`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/color-tokens.test.mjs`, `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## Exclusions

- generated snapshot 정리 제외
- 모든 화면의 정보구조 재설계 제외
- 새 dependency 설치 제외
- 서버/데이터 모델 변경 제외

## Slice

- ID: `wm-scroll-scope-color-speed`
- Touch paths:
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/scripts/check-scroll-containers.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/tests/`
  - `platform-desktop-app/renderer/workspace-monitor/docs/requirements/`
  - `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-scroll-scope-color-speed/`
  - `_history/`

## Merge Gate

- Static scroll/color/3D pause tests
- TypeScript/check/build/customer build/performance budget
- desktop/mobile Browser overflow and scroll scope smoke
- `git diff --check`
