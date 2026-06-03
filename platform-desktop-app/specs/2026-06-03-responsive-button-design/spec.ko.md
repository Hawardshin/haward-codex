# Spec: Responsive Button Design

## Scope

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`의 공통 button contract와 주요 button group responsive rule.
- `platform-desktop-app/scripts/check-readiness.mjs`, `platform-desktop-app/tests/readiness.test.mjs`의 회귀 방지 token check.
- Customer snapshot/build refresh.

## Design Contract

- `--control-hit-size`: 최소 pointer target 보장.
- `--control-target-size`: 일반 desktop control 높이.
- `--control-radius`, `--control-gap`, `--control-padding-x`: 버튼 간 일관성.
- `.desktop-app-root button:focus-visible`: keyboard focus 위치 표시.
- `.desktop-app-root button:not(:disabled):active`: 눌림 피드백.
- 720px 이하에서는 주요 action group을 1-column full-width로 전환한다.

## Non-goals

- 전체 디자인 시스템 재작성.
- 제품 컬러 팔레트 변경.
- 버튼 컴포넌트 라이브러리 도입.
