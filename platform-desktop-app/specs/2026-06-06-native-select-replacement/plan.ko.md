# Plan: Native Select 교체

1. Workspace Monitor에서 남은 native `<select>` 위치를 확인한다.
2. 공통 앱 선택 컴포넌트 `AppChoiceMenu`, `AppChoiceButtonGroup`을 추가한다.
3. 문서/기록 필터를 앱 메뉴로 교체한다.
4. Learning Loop와 Decision Inbox의 짧은 선택지를 버튼 그룹으로 교체한다.
5. CSS 충돌을 정리하고 compact/active/hover 상태를 맞춘다.
6. 테스트, 타입 체크, 브라우저 smoke, 내부 패키징을 실행한다.

## 근거

- MDN은 `<select>`가 CSS로 생산적으로 스타일링하기 어려웠고 완전 제어가 필요하면 커스텀 위젯과 WAI-ARIA 의미 부여가 필요하다고 설명한다.
- WAI-ARIA APG는 listbox/option 패턴을 제공한다.
- Apple HIG와 Material Design 모두 선택 후 현재 선택이 분명히 드러나는 메뉴/선택 컨트롤을 권장한다.
