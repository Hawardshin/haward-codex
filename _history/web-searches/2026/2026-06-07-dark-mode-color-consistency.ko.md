# 2026-06-07 다크모드 색상 일관성 웹 검색 기록

## 검색 쿼리

- `WCAG 2.2 color contrast dark mode UI official contrast minimum`
- `Material Design dark theme color official surface elevation contrast`
- `Apple Human Interface Guidelines dark mode color official`

## 확인한 출처

- W3C WCAG 2.2 Contrast Minimum: https://www.w3.org/TR/WCAG22/#contrast-minimum
- Material Design Dark Theme: https://m2.material.io/design/color/dark-theme.html
- Apple Human Interface Guidelines Dark Mode: https://developer.apple.com/design/human-interface-guidelines/dark-mode

## 계획 반영

- 텍스트 대비는 WCAG의 일반 텍스트 최소 대비 기준을 기준선으로 유지했다.
- 다크 테마는 완전한 검정/순백 조합 대신 표면 단계와 부드러운 전경 색을 나누도록 조정했다.
- 시스템 다크와 명시 다크가 같은 핵심 토큰을 쓰도록 테스트로 고정했다.

## 불확실성

- 디자인 가이드는 원칙과 기준선만 제공하므로 실제 앱의 사용성 판단은 로컬 렌더링, 계산 스타일, 회귀 테스트로 검증했다.
