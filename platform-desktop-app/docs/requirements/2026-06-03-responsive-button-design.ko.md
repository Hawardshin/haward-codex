# Requirements: Responsive Button Design

## 목적

설치형 데스크톱 앱 UI에서 버튼이 웹 페이지처럼 제각각 반응하지 않도록, 최소 클릭 영역, 눌림/hover/focus 피드백, 긴 문구 줄바꿈, 모바일 full-width 배치를 일관화한다.

## 요구사항

### PDA-REQ-044 버튼 클릭 영역

- 모든 버튼은 최소 24x24 CSS px 이상의 pointer target을 가져야 한다.
- desktop workbench 톤을 유지하되 공통 control token으로 기본 버튼 크기와 radius를 관리한다.

### PDA-REQ-045 버튼 반응 피드백

- 버튼은 hover, active, focus-visible 상태를 명확히 보여야 한다.
- `prefers-reduced-motion` 환경에서는 기존 motion reduction 규칙을 유지한다.

### PDA-REQ-046 반응형 버튼 레이아웃

- 720px 이하 화면에서 action group 버튼은 화면 밖으로 밀리지 않아야 한다.
- 긴 한국어/영어 버튼 문구는 container 안에서 줄바꿈되어야 한다.
- terminal drawer, source workbench, settings subsection, workspace action 버튼도 같은 반응형 기준을 따라야 한다.

### PDA-REQ-047 Source 편집 버튼 제품감

- 파일을 열고 편집하는 Source workbench의 버튼은 기본 HTML 버튼처럼 보이면 안 된다.
- 파일 열기/저장/복사는 action bar로, Undo/Find/Fold 같은 편집 명령은 compact toolbar로, 파일 목록 row는 클릭 가능한 file row로 시각적으로 구분되어야 한다.
- 1080px 이하 compact desktop에서는 Source Explorer/editor가 좌우로 밀리지 않도록 stacked layout으로 전환하고, 버튼이 viewport 밖으로 나가지 않아야 한다.

## Acceptance

- Desktop 1280x720 browser smoke에서 visible buttons target issue 0건, horizontal overflow 0건.
- Mobile 390x844 browser smoke에서 visible buttons target issue 0건, horizontal overflow 0건.
- Mobile terminal drawer open state에서 button overflow issue 0건.
- Readiness test가 responsive button CSS token을 확인한다.
- Source workbench browser smoke에서 desktop, compact, mobile 모두 action/tool/tab button이 viewport 밖으로 나가지 않는다.
