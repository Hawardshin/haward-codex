# Web Search: Dark Mode Contrast Fix

날짜: 2026-06-07

## 검색

- `WCAG 2.2 contrast minimum text user interface components official dark mode colors`
- `Material Design dark theme color system contrast official`
- `Apple Human Interface Guidelines Dark Mode color contrast official`
- `WCAG 2.2 Understanding contrast minimum 1.4.3 official W3C`
- `WCAG 2.2 non-text contrast 1.4.11 official W3C`

## 확인한 출처

- W3C WCAG 2.2 Understanding SC 1.4.3 Contrast Minimum: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C WCAG 2.2 Understanding SC 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
- Apple HIG Dark Mode: https://developer.apple.com/design/human-interface-guidelines/dark-mode
- MDN CSS overflow/scrollbar 자료는 이번 색상 수정에는 보조 참고로만 사용했다.

## 계획 영향

- 작은 텍스트는 4.5:1 이상을 목표로 평가했다.
- 다크 모드에서 모든 강조색을 어둡게 만드는 대신, 흰 텍스트가 올라가는 선택/배지 배경만 대비용 토큰으로 분리했다.

## 불확실성

- 현재 기본 화면에서 측정한 문제를 해결했다. 전체 앱의 모든 nested surface 색상 audit는 별도 작업으로 분리하는 것이 맞다.
