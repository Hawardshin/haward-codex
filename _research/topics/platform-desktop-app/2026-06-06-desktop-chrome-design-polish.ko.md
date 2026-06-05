# 데스크톱 크롬 디자인 개선 리서치 요약

## 결론

이번 패치는 정보 구조 재설계보다 공통 디자인 토큰의 적용 범위를 늘리는 것이 가장 효과적이다. 사용자의 불만은 특정 한 화면보다 전체가 기본 버튼과 평면 표면으로 보이는 문제에 가깝기 때문이다.

## 적용한 참고 원칙

- Apple HIG Layout: control/content 관계와 시각 계층이 플랫폼 친화성을 만든다.
- Fluent 2 Elevation: 그림자와 표면 깊이는 중요도와 현재 포커스를 구분하는 데 쓰인다.
- Fluent 2 Color/Layout: neutral surface와 token 기반 색상 사용은 복잡한 업무 UI의 일관성을 높인다.
- WCAG 2.2: focus appearance, target size, visible states는 조작 가능성의 기본 요건이다.

## 로컬 적용

- 활동 레일: 현재 위치 indicator와 selected surface를 강화한다.
- 상단바: 작업면과 분리되는 chrome elevation을 적용한다.
- 섹션 탭: group active accent와 selected tab shadow를 적용한다.
- 공통 버튼: hover/press/focus 상태를 tokenized feedback으로 연결한다.
- 테마: light, dark, system dark 모두에서 같은 token contract를 보장한다.

## 참고 URL

- https://developer.apple.com/design/human-interface-guidelines/layout
- https://fluent2.microsoft.design/elevation
- https://fluent2.microsoft.design/color
- https://fluent2.microsoft.design/layout
- https://www.w3.org/TR/WCAG22/
