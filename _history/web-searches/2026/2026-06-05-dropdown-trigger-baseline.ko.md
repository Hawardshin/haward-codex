# 웹 검색 기록: Dropdown Trigger Baseline

## 검색

- 날짜: 2026-06-05
- 목적: Tool Studio 기본 드롭다운 버튼 개선 전 접근성/디자인 기준 확인

## 질의

- `WAI ARIA menu button pattern dropdown button official`
- `Radix UI Dropdown Menu accessibility trigger aria expanded official`
- `Material Design menus exposed dropdown menu button guidelines official`
- `Apple Human Interface Guidelines pull-down buttons menus official`

## 확인한 강한 출처

- WAI-ARIA APG Menu Button Pattern: menu button은 메뉴를 여는 button이며, 아래쪽 화살표/삼각형 같은 affordance를 사용할 수 있고 `aria-haspopup`/`aria-expanded` 상태가 필요하다.
- Radix UI Dropdown Menu: trigger는 menu를 토글하는 버튼이며 `[data-state="open" | "closed"]`를 제공하고 focus/keyboard navigation을 관리한다.
- Material Design 3 Menus: 메뉴는 선택 가능한 항목을 열어주는 transient surface로, trigger와 선택 행동의 관계가 명확해야 한다.
- Apple HIG Buttons: 버튼은 행동을 명확히 예측할 수 있어야 하며, 보조 선택지를 여는 control은 상태와 목적을 숨기지 않아야 한다.

## 약한 출처 처리

- 일반 블로그와 비공식 컴포넌트 예시는 이번 작업의 기준으로 쓰지 않았다.

## 계획 반영

- Tool Studio trigger에 `aria-haspopup="menu"`를 명시한다.
- Radix trigger의 `data-state`를 caret open-state 스타일에 사용한다.
- 현재 선택 세부 기능과 parent flow를 버튼 안에 함께 표시한다.
- 좁은 화면에서 줄바꿈 깨짐 대신 ellipsis와 full-width 축소를 사용한다.
