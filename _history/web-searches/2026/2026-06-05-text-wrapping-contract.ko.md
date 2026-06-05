# 웹 검색 기록: Text Wrapping Contract

## 검색

- 날짜: 2026-06-05
- 목적: 한글/한영 문장, 버튼 라벨, 긴 경로/코드 토큰이 작은 화면에서 깨지지 않는 CSS 계약을 잡기 위한 공식 기준 확인

## 질의

- `WCAG text spacing reflow official no loss content horizontal scrolling`
- `MDN CSS overflow-wrap word-break white-space text-wrap official`
- `Material Design typography line length wrapping official guidelines`
- `Apple Human Interface Guidelines typography truncation wrapping text official`

## 확인한 강한 출처

- W3C WAI WCAG 2.2 Reflow: 320 CSS px 폭에서도 정보/기능 손실과 2차원 스크롤 없이 content가 reflow되어야 한다는 기준. URL: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- MDN `overflow-wrap`: `anywhere`와 `break-word`가 긴 unbreakable string overflow를 막는 줄바꿈 값을 제공한다는 기준. URL: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
- MDN `word-break`: `keep-all`은 CJK 텍스트에 단어 분리를 사용하지 않는 값이라는 기준. URL: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
- Material Design 3 Typography: 읽기 가능한 typography scale과 hierarchy를 제품 UI 전반에 일관되게 적용하는 참고 기준. URL: https://m3.material.io/styles/typography/overview

## 약한 출처 처리

- 일반 블로그, 임의 CSS snippet, 비공식 디자인 글은 이번 구현 근거로 사용하지 않았다.

## 계획 반영

- prose selector와 long-token selector를 분리한다.
- 한글/한영 문장형 텍스트는 `word-break: keep-all`로 어색한 글자 단위 분리를 줄인다.
- 경로/명령/코드 토큰은 `overflow-wrap: anywhere` 계열로 작은 화면 overflow를 막는다.
- 버튼 라벨은 부모 폭을 넘지 않는 별도 계약으로 고정한다.
