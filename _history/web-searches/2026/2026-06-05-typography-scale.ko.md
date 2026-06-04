# 웹 검색 기록: Workspace Monitor typography scale

- 날짜: 2026-06-05
- 요청: Workspace Monitor 화면에서 텍스트 크기가 들쭉날쭉하다는 피드백을 UI 개선에 반영.

## 검색

- `WCAG Understanding Resize Text responsive typography text sizing reflow`
- `MDN CSS font-size responsive design accessibility rem em text scaling`
- `W3C WAI text spacing resize text WCAG`
- `MDN CSS font-family system font stack CSS readability Korean sans-serif`
- `Korean web font readability Pretendard system font Noto Sans KR documentation`

## 확인한 출처

- W3C WAI Understanding SC 1.4.4 Resize Text: https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html
- W3C WAI Understanding SC 1.4.12 Text Spacing: https://www.w3.org/WAI/WCAG21/Understanding/text-spacing
- W3C WAI Understanding SC 1.4.10 Reflow: https://w3c.github.io/wcag21/understanding/reflow
- MDN font-size CSS reference: https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
- MDN font-family CSS reference: https://developer.mozilla.org/docs/Web/CSS/font-family
- MDN responsive design guide: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- Noto Sans CJK KR specimen: https://notofonts.github.io/noto-docs/specimen/NotoSansCJKkr/
- KRDS typography reference: https://www.krds.go.kr/html/site/style/style_03.html

## 계획 영향

- 텍스트 크기를 viewport 폭에 맞춰 임의로 줄이기보다, 역할 기반 token과 layout reflow로 정보량을 조절한다.
- `px` 숫자 선언이 컴포넌트마다 흩어지면 같은 역할의 텍스트가 다른 크기로 보이므로 `globals.css`에 typography token을 둔다.
- 브라우저 기본 `<small>` 축소는 의도하지 않은 11px 미만 visible text를 만들 수 있으므로 앱 내부 기본값을 명시적 11px small token으로 고정한다.
- 한국어와 영어가 섞인 운영 UI는 `Pretendard`/`Noto Sans KR`를 우선 fallback에 두고, 설치되지 않은 환경에서는 Apple/Windows/system sans로 내려가게 한다.
- 최종 검증은 CSS 선언 감사와 브라우저 computed font-size 감사로 나눈다.

## 불확실성

- 이번 검증은 주요 5개 섹션의 visible viewport 영역을 대상으로 했다. 모든 설정 dialog와 모든 내부 subview를 전수 검증한 것은 아니다.
- 코드 에디터 canvas, terminal, 파일 트리처럼 작업 특성상 dense text가 필요한 영역은 11px 이상 24px 이하 scale 안에서만 허용한다.

## 공개 판단 요약

- Workspace Monitor의 visible text는 typography token을 통해 11px 이상 24px 이하의 명확한 단계에 있어야 한다.
- 작은 보조 텍스트는 작게 유지하되 11px 아래로 내려가지 않아야 한다.
- font stack은 `Pretendard`/`Noto Sans KR`와 시스템 sans fallback을 포함해야 한다.
- 직접 숫자 기반 `font-size` 선언, viewport 기반 font-size, 브라우저 기본 `<small>` 축소로 scale 밖 텍스트가 나오면 실패로 본다.
