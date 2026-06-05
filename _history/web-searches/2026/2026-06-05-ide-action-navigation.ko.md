# 웹 검색 기록: IDE Action Navigation

## 검색

- 날짜: 2026-06-05
- 목적: Tool Studio 상세 기능을 IntelliJ식 드롭다운/우클릭/단축키 접근으로 바꾸기 위한 기준 확인

## 질의

- `JetBrains IntelliJ IDEA UI context menu keyboard shortcuts official documentation`
- `JetBrains IntelliJ IDEA quick switch scheme navigation bar context menu official documentation`
- `WAI ARIA menu button keyboard interaction context menu official APG`
- `Radix UI Context Menu Dropdown Menu keyboard navigation official docs`

## 확인한 강한 출처

- JetBrains IntelliJ IDEA keyboard shortcuts: Search Everywhere, Find Action, Context Actions, Quick Lists, shortcut learning 기준. URL: https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html
- JetBrains Configure keyboard and mouse shortcuts: action마다 keyboard/mouse shortcut과 keymap을 관리하는 기준. URL: https://www.jetbrains.com/help/idea/configuring-keyboard-and-mouse-shortcuts.html
- WAI-ARIA APG Menu Button Pattern: button으로 menu를 열고 Enter/Space keyboard interaction을 제공하는 기준. URL: https://w3c.github.io/wai-website/ARIA/apg/patterns/menu-button/
- Radix Context Menu: full keyboard navigation을 제공하는 context menu primitive. URL: https://www.radix-ui.com/primitives/docs/components/context-menu

## 약한 출처 처리

- 일반 블로그와 Reddit은 구현 기준으로 사용하지 않았다.

## 계획 반영

- Tool Studio는 세부 기능을 더 펼치지 않고 action menu/context menu/shortcut entry point를 늘린다.
- 좌클릭은 직접 선택, 우클릭은 context action, `Alt+Enter`는 quick action menu로 분리한다.
- 기존 mode shortcut은 parent stage와 selected tool도 함께 동기화한다.
