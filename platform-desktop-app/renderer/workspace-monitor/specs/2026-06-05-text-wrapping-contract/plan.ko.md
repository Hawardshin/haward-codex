# Text Wrapping Contract 계획

## 구현 순서

1. 기존 typography token과 button/control text 규칙을 확인한다.
2. 문장형 텍스트, inline label, 긴 토큰, 버튼 자식 텍스트의 줄바꿈 계약을 `globals.css`에 추가한다.
3. CSS 계약을 static test로 고정한다.
4. 빌드 산출물을 정적 서버로 띄워 desktop/mobile Browser smoke와 screenshot smoke를 수행한다.
5. 요구사항, 검증, 추적, 평가 기록을 남기고 커밋/푸시한다.

## 근거

- WCAG Reflow는 좁은 viewport에서 정보 손실이나 2차원 스크롤 없이 텍스트가 읽히는 것을 요구한다.
- MDN `overflow-wrap: anywhere`는 긴 URL/단어 같은 unbreakable string이 overflow를 만들지 않게 하는 값으로 설명된다.
- MDN `word-break: keep-all`은 CJK 텍스트에 임의 단어 분리를 쓰지 않는 값으로 설명된다.

## 리스크와 대응

- 리스크: 문장형 텍스트에 `anywhere`를 전역 적용하면 한글이 글자 단위로 깨질 수 있다.
- 대응: prose와 long-token selector를 분리한다.
- 리스크: 긴 코드/경로 토큰에 `keep-all`만 적용하면 작은 화면에서 수평 overflow가 생길 수 있다.
- 대응: `code`, `kbd`, `samp`, `.path`는 long-token wrapping contract로 별도 처리한다.
