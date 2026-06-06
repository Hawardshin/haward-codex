# Web Search: 버튼 텍스트 줄바꿈과 ellipsis 계약

날짜: 2026-06-06

## 질의
- `MDN text-overflow CSS ellipsis overflow hidden white-space nowrap`
- `MDN white-space CSS nowrap button label wrapping`
- `WCAG Reflow success criterion 1.4.10 text controls truncation`

## 확인한 출처
- MDN `text-overflow`: `text-overflow`가 숨겨진 overflow content 표시 방식이며, 실제 ellipsis에는 `overflow`와 `white-space`가 함께 필요하다는 기준을 확인했다.  
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-overflow
- MDN `white-space`: `nowrap`이 줄바꿈을 막는 방식임을 확인했다.  
  https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
- W3C WCAG Understanding Reflow: truncation은 정보 접근 경로가 사라지지 않도록 주의해야 하며, 컨트롤 DOM 텍스트와 접근 가능한 이름을 유지하는 방향으로 반영했다.  
  https://w3c.github.io/wcag/understanding/reflow.html

## 계획 반영
- 버튼 라벨은 `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`을 함께 적용한다.
- 본문/경로/코드 같은 긴 텍스트 wrap 정책과 액션 버튼 라벨 정책을 분리한다.
- 시각적으로 잘린 버튼도 DOM 텍스트와 accessible name은 유지한다.

## 불확실성
- 실제 Tauri WebView 렌더링은 브라우저 smoke와 일부 차이가 날 수 있어 internal package build 후에도 앱 smoke를 유지한다.
