# 웹 검색 기록: Non-fullscreen layout reflow

- 날짜: 2026-06-05
- 요청: 전체화면이 아닐 때 깨지는 화면이 많다는 피드백을 Workspace Monitor 개선에 반영.

## 검색

- `WCAG responsive reflow horizontal scrolling 320 CSS pixels`
- `web.dev responsive design overflow horizontal scrolling test viewport`
- `MDN CSS overflow responsive layout min-width flex grid reflow`

## 확인한 출처

- W3C WAI Understanding SC 1.4.10 Reflow: https://w3c.github.io/wcag/understanding/reflow.html
- W3C Technique G225: https://www.w3.org/WAI/WCAG21/Techniques/general/G225
- web.dev CSS overflow: https://web.dev/learn/css/overflow/
- MDN Flow layout and overflow: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Flow_layout_and_overflow

## 계획 영향

- 전체 페이지는 320px급 좁은 viewport까지 루트 수평 스크롤 없이 reflow되어야 한다는 기준을 채택했다.
- overflow를 단순히 숨기는 대신, 복합 grid를 960px 이하에서 1열로 재배치하고 420px 이하 navigation은 두 줄로 내려 모든 주요 버튼을 보이게 했다.
- 고정 폭/높이 또는 큰 min-width가 작은 창에서 overflow를 만들 수 있으므로 Source/Explorer/toolbar/titlebar 컨트롤에 `minmax(0, 1fr)`, `max-width: 100%`, 44px 이상 target 기준을 적용했다.

## 불확실성

- WCAG의 예외가 되는 실제 2차원 콘텐츠는 source editor/terminal처럼 내부 스크롤이 필요한 영역에 남긴다.
- 이번 검증은 정적 export의 주요 5개 섹션과 5개 viewport 조합을 대상으로 했다. 모든 숨은 설정 dialog와 모든 내부 subview를 전수 검증한 것은 아니다.

## 공개 판단 요약

- 비전체화면 품질 기준은 `rootOverflow=0`, `bodyOverflow=0`, visible target 44px 이상, 주요 navigation이 작은 창에서 숨지 않는 것으로 정했다.
