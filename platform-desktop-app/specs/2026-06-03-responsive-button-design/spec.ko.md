# Spec: Responsive Button Design

## Scope

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`의 공통 button contract와 주요 button group responsive rule.
- Source 파일/코드 workbench의 파일 열기/저장/복사 action bar, 편집 toolbar, 파일 row, editor tab button 시각 계층.
- Source 편집 저장 완료 상태와 `저장 결과` 탭의 receipt-style result surface.
- `platform-desktop-app/scripts/check-readiness.mjs`, `platform-desktop-app/tests/readiness.test.mjs`의 회귀 방지 token check.
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-source-control-design.mjs`의 Source control design token check.
- Customer snapshot/build refresh.

## Design Contract

- `--control-hit-size`: 최소 pointer target 보장.
- `--control-target-size`: 일반 desktop control 높이.
- `--control-radius`, `--control-gap`, `--control-padding-x`: 버튼 간 일관성.
- `.desktop-app-root button:focus-visible`: keyboard focus 위치 표시.
- `.desktop-app-root button:not(:disabled):active`: 눌림 피드백.
- 720px 이하에서는 주요 action group을 1-column full-width로 전환한다.
- Source workbench의 primary action은 `.source-action-button`으로, 반복 편집 명령은 `.source-tool-button`으로, 파일 목록은 row button으로 분리한다.
- Source action bar는 default HTML button처럼 보이지 않도록 container, accent stripe, hover/focus/active feedback, primary/save/copy tone을 가진다.
- 1080px 이하 compact desktop에서는 파일 Explorer/editor 2-column layout을 1-column으로 전환하고 Source action controls는 2-column, 720px 이하에서는 1-column으로 전환한다.
- Source toolbar와 view switcher는 좁은 폭에서 horizontal scroll 가능한 compact strip으로 유지하되 document 전체 horizontal overflow를 만들면 안 된다.
- Source 저장 결과는 `.source-results-hero`, `.source-results-summary`, `.source-save-result-card`, `.source-result-lozenge`, `.source-result-backup-path`로 구성된 receipt surface로 표시한다.
- 편집 화면의 저장 완료 상태는 `.source-inline-save-receipt`를 사용해 결과 탭과 같은 백업 완료 언어를 유지한다.
- 1080px 이하에서는 `.source-results-summary`가 2-column으로, 720px 이하에서는 1-column으로 전환되어 긴 경로가 화면 밖으로 나가지 않아야 한다.

## Non-goals

- 전체 디자인 시스템 재작성.
- 제품 컬러 팔레트 변경.
- 버튼 컴포넌트 라이브러리 도입.
