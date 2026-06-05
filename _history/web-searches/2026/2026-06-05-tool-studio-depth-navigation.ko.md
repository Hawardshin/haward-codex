# 웹 검색 기록: Tool Studio Depth Navigation

## 질의

- `Nielsen Norman Group progressive disclosure usability official`
- `Nielsen Norman Group information scent navigation hierarchy official`
- `Material Design navigation hierarchical destinations nested navigation official`
- `Apple Human Interface Guidelines navigation hierarchy disclosure official`

## 확인한 출처

- Material Design, Navigation patterns: https://m1.material.io/patterns/navigation.html
- Material Design, Navigation transitions: https://m2.material.io/design/navigation/navigation-transitions.html
- Material Design, Navigation drawer: https://m2.material.io/components/navigation-drawer
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/

## 계획 영향

- 기능이 많을 때 같은 depth의 sibling을 모두 펼치기보다 parent flow 아래에 child mode를 두는 구조가 더 명확하다.
- Tool Studio의 4개 세부 모드는 `제작 준비`와 `출시 관리` parent flow로 묶을 수 있다.
- 단축키나 외부 task flow가 child mode로 직접 들어와도 parent context가 맞춰져야 사용자가 현재 깊이를 잃지 않는다.

## 불확실성

- 이번 변경은 Tool Studio mode 선택 깊이에 집중한다. 각 child workbench 내부의 세부 폼 depth는 별도 개선 대상이다.
