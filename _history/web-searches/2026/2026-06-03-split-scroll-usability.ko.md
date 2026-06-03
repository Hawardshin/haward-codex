# Web Search: Split Scroll Usability

## 검색 시각

- 2026-06-03 KST

## Queries

- `MDN CSS overflow scroll container min-height 0 grid flex official`
- `MDN CSS position sticky overflow scroll container official`
- `CSS grid split pane independent scrolling minmax min-height 0 MDN overflow`

## 확인한 강한 출처

- MDN `overflow`: `https://developer.mozilla.org/en-US/docs/Web/CSS/overflow`
- MDN `position`: `https://developer.mozilla.org/en-US/docs/Web/CSS/position`
- MDN `grid`: `https://developer.mozilla.org/en-US/docs/Web/CSS/grid`

## 계획 영향

- scroll container는 `overflow`가 있는 영역으로 명확히 분리한다.
- sticky element는 가까운 scrolling ancestor 영향을 받으므로 dialog/title/pane 구조에서 sticky와 overflow를 섞지 않고, header와 content scroll을 grid row로 분리한다.
- grid/flex child가 내부 overflow를 만들 수 있도록 `min-height: 0`과 `minmax(0, 1fr)`를 명시한다.
- 키보드 사용자가 scroll container를 조작할 수 있도록 focusable pane을 둔다.

## 약한 출처 처리

- Stack Overflow와 Reddit 결과는 문제 발견 신호로만 참고했고, 구현 근거는 MDN과 현재 프로젝트 구조를 우선했다.
