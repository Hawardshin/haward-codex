# Web Search: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 검색

- `MDN CSS overflow scrollbar layout min-width flex grid sidebar official`
- `web.dev avoid horizontal overflow CSS grid flexbox minmax 0 sidebar`
- `W3C CSS overflow module scrollbar overflow official`

## 확인한 출처

- MDN CSS overflow: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
- MDN scrollbar-gutter: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
- web.dev overflow debugging: https://web.dev/learn/css/overflow

## 계획 영향

- overflow는 축별로 명시해 의도하지 않은 가로 스크롤을 막는다.
- 안정 gutter는 레이아웃 흔들림 방지에는 유용하지만 좁은 rail에서는 가용 폭을 줄여 phantom horizontal overflow를 만들 수 있으므로 rail nav에는 `scrollbar-gutter: auto`를 적용한다.
- 버튼은 컨테이너 폭을 초과하지 않도록 `min-width: 0`, `box-sizing: border-box`, 컨테이너 상대 폭을 사용한다.

## 불확실성

- packaged Tauri shell의 OS scrollbar 렌더링은 Browser smoke와 CSS contract로 간접 검증했다.
