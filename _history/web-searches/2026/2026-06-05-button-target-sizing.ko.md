# 웹 검색 기록: 버튼 클릭 타깃 크기

- 날짜: 2026-06-05
- 요청: 사용성 측면에서 버튼 크기 조정
- 쿼리:
  - `WCAG 2.2 target size minimum button touch target 24 44 CSS official`
  - `Material Design buttons touch target minimum 48 CSS official`
  - `Apple Human Interface Guidelines controls minimum hit target size buttons`

## 확인한 기준

- W3C WCAG 2.2 Success Criterion 2.5.8은 pointer target의 최소 크기를 24 by 24 CSS px로 제시한다. <https://w3c.github.io/wcag/guidelines/22/>
- Material Design은 버튼의 touch target을 48px 계열로 다루며, 시각 크기보다 터치 영역을 크게 잡는 접근을 설명한다. <https://m2.material.io/design/components/buttons.html>
- Apple HIG는 버튼 hit region을 최소 44 by 44 pt로 안내한다. <https://developer.apple.com/design/human-interface-guidelines/buttons>

## 계획 반영

- 데스크톱 반복 액션은 44px를 기본 target으로 삼는다.
- compact toolbar는 40px를 허용하되, coarse pointer/mobile에서는 44px로 올린다.
- 파일 트리처럼 밀도 높은 행은 desktop 32px, mobile/coarse pointer 40px로 분리한다.
