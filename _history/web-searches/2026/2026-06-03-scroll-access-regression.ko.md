# Web Search: Scroll Access Regression

## 질의

- `MDN CSS overflow scroll container accessibility keyboard scrolling best practices`
- `web.dev CSS overflow scroll containers avoid hidden content responsive layout`

## 확인한 출처

- MDN, `overflow - CSS`: `overflow: hidden`과 `clip`은 보이는 영역 밖 콘텐츠 접근을 제한하며, 스크롤 컨테이너 접근성과 keyboard scrolling을 별도로 고려해야 한다.
- web.dev, `Overflow`: 고정 box 안에서 넘친 콘텐츠를 `hidden`으로 숨기면 데이터가 보이지 않을 수 있고, 필요한 영역은 명시적인 scroll container로 설계해야 한다.

## 반영한 결정

- desktop app shell에서 고정 `min-height: 720px`와 중첩 `100vh`를 제거하고 dynamic viewport height 기반으로 내부 viewport가 스크롤 책임을 갖게 했다.
- 설정 dialog, 터미널 drawer, 파일/코드 workbench는 부모가 콘텐츠를 숨기지 않고 각 pane이 `overflow: auto`, `overscroll-behavior: contain`, `scrollbar-gutter: stable`을 갖도록 회귀 검사를 추가했다.
- keyboard 사용자가 독립 scroll pane에 들어갈 수 있도록 desktop viewport와 terminal drawer pane에 `tabIndex={0}`을 추가했다.

## 불확실성

- 정적 브라우저 smoke는 Tauri native workspace와 실제 장시간 CLI session을 완전히 재현하지 못한다. CSS 계약 검사와 렌더링 smoke로 제품 UI 회귀를 막고, 실제 packaged runtime smoke는 별도 release gate로 유지한다.
