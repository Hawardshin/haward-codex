# 데스크톱 크롬 디자인 개선 웹 검색 기록

## 검색 시각

2026-06-06 KST

## 검색 쿼리

- `Apple Human Interface Guidelines layout visual hierarchy desktop app design official`
- `Microsoft Fluent 2 design system elevation color layout official`
- `Nielsen Norman Group visual hierarchy UI design scannability`
- `WCAG 2.2 focus appearance target size contrast official`

## 확인한 고신뢰 소스

- Apple Human Interface Guidelines, Layout: https://developer.apple.com/design/human-interface-guidelines/layout
- Microsoft Fluent 2, Elevation: https://fluent2.microsoft.design/elevation
- Microsoft Fluent 2, Color: https://fluent2.microsoft.design/color
- Microsoft Fluent 2, Layout: https://fluent2.microsoft.design/layout
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Nielsen Norman Group visual design references were checked as supporting usability theory signals, but the implementation relied mainly on official platform/design-system/accessibility sources.

## 계획 영향

- 새 장식 요소를 추가하기보다 existing chrome/control/tabs에 depth token을 연결한다.
- desktop-only 최소 폭 정책을 유지하고 모바일 UI를 되살리지 않는다.
- focus/target-size 계열 토큰은 유지하면서 hover/press feedback을 보강한다.
- dark/system dark 테마에서도 토큰 누락이 없도록 명시한다.

## 불확실성

- 시각 선호는 주관성이 있으므로 Browser smoke는 렌더 오류와 주요 표면 확인 중심으로 수행한다.
