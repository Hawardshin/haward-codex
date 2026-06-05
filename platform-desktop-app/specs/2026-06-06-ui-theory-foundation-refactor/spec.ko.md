# UI 이론 기반 디자인 파운데이션 리팩토링 스펙

## 목표

데스크톱 앱의 홈/설정/카드/버튼 표면이 같은 시각 위계, spacing, 상태 피드백 규칙을 사용하도록 전역 CSS foundation을 강화한다.

## 변경 대상

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 구현 계약

- CSS 토큰:
  - `--grid-unit`
  - `--space-*`
  - `--surface-depth-*`
  - `--hierarchy-border*`
  - `--state-hover-*`
  - `--surface-shadow-*`
  - `--focus-halo*`
- 쉘 계약:
  - `.desktop-app-shell`은 `data-ui-foundation="gestalt-hierarchy-density"` 속성을 가진다.
- 표면 계약:
  - 설정 dialog/pane/tab rail, home focus card/navigation dock, adapter card는 hierarchy/depth token을 사용한다.
  - hover/focus 상태는 기본 브라우저 버튼처럼 보이지 않도록 app token을 사용한다.
- 테마 계약:
  - explicit dark와 system dark 모두 `--surface-depth-0` 및 `--surface-depth-1`을 dark surface로 재정의한다.

## 수용 기준

- 정적 테스트가 foundation token, shell marker, hover/focus 상태 규칙을 검증한다.
- readiness check가 foundation token과 shell marker 누락을 잡는다.
- 브라우저 검증에서 홈과 설정 주요 표면이 렌더되고 수평 overflow가 0이어야 한다.
