# 웹 검색 기록

## 쿼리

- `WAI ARIA radio group select listbox settings form user choices official`
- `Nielsen Norman Group form design dropdown radio buttons settings choices`
- `Apple Human Interface Guidelines settings controls radio buttons pickers macOS`
- `Material Design selection controls settings radio buttons chips`

## 확인한 기준

- WAI-ARIA Authoring Practices는 선택형 UI에서 radio group, listbox 같은 명확한 선택 패턴을 제공한다.
- Apple Human Interface Guidelines와 Material Design은 설정 선택에서 명시적 선택 컨트롤을 쓰고 상태를 시각적으로 드러내는 패턴을 제공한다.
- NN/g 계열 폼 디자인 권고는 사용자가 가능한 옵션을 이해해야 하는 상황에서 숨겨진 입력보다 명시적 선택지를 선호한다.

## 계획 영향

텍스트 입력을 제거하지 않고, 선택 버튼을 먼저 두고 직접 편집을 보조로 유지하는 방향으로 구현했다. 모델 datalist처럼 선택지가 숨겨지는 패턴은 명시적 선택 카드로 바꿨다.

## 불확실성

브라우저 스모크는 스냅샷 로더 상태에 머물러 실제 본문 시각 확인은 제한됐다. 컴파일, 정적 테스트, 내부 패키징 검증으로 기능 계약을 보완했다.
