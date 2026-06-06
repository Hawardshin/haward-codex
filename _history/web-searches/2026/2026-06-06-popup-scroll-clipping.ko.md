# Web Search: Popup Scroll Clipping

날짜: 2026-06-06

## 질의
- `MDN CSS overflow clipping popover position fixed portal overlay scroll container`
- `WAI ARIA dialog modal popup focus management scroll container overflow clipping`
- `Floating UI prevent overflow flip shift portal scroll clipping docs`

## 확인한 출처
- MDN CSS `overflow`: overflow가 scroll container와 clipping 동작을 만든다는 기본 동작 확인. https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
- Floating UI `FloatingPortal`: floating element를 clipping parent 밖으로 빼야 `overflow: hidden` 같은 조상 clipping을 피할 수 있음을 확인. https://floating-ui.com/docs/floatingportal
- Floating UI `flip` / `detectOverflow`: viewport나 clipping boundary 기준 overflow 감지, flip/shift류 위치 보정 개념 확인. https://floating-ui.com/docs/flip / https://floating-ui.com/docs/detectoverflow
- WAI-ARIA APG Dialog Modal Pattern: 큰 팝업/대화상자는 초점과 스크롤이 사용자가 내용을 놓치지 않게 관리되어야 함을 확인. https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

## 적용 판단
- 이 변경은 외부 라이브러리 교체 없이 기존 Radix DropdownMenu/ContextMenu 포털을 유지한다.
- 팝업은 scroll pane 안에 직접 두지 않고 portal layer에서 렌더링한다.
- 팝업 높이는 Radix가 제공하는 available-height CSS 변수와 앱 viewport gap token을 같이 사용해 viewport 안에서만 커지고, 목록은 팝업 내부에서만 스크롤한다.

## 불확실성
- Browser 실측은 개발 preview 기준이다. Tauri native webview에서도 같은 CSS/DOM 계약이 적용되지만 OS webview별 세부 스크롤 감각은 패키지 smoke에서 계속 확인해야 한다.

## 2026-06-06 후속 검색: 전체 팝업/오버레이 검토

### 추가 질의
- `WAI ARIA Authoring Practices dialog modal focus trap escape overlay`
- `WAI ARIA Authoring Practices menu button keyboard focus escape`
- `Radix UI Dropdown Menu collisionPadding portal avoid clipping scroll container`
- `MDN popover API top layer CSS z-index focus accessibility`

### 추가 확인 출처
- WAI-ARIA APG Dialog Modal Pattern: modal dialog는 외부 content interaction을 막고, focus를 dialog 내부에 유지하며, `Escape` 닫기와 close button을 제공해야 한다. https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- WAI-ARIA APG Menu Button Pattern: menu button은 버튼 role, menu open state, keyboard open/focus behavior를 가져야 한다. https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
- Radix Dropdown Menu docs: `Portal`, `collisionPadding`, `--radix-dropdown-menu-content-available-height`를 통해 clipping parent 밖 렌더링과 viewport height 제한을 지원한다. https://www.radix-ui.com/primitives/docs/components/dropdown-menu
- MDN Popover API: native popover는 showing 상태에서 top layer에 추가된다. 이 변경은 native popover 전환이 아니라 앱 root portal로 같은 clipping 회피 목표를 달성한다. https://developer.mozilla.org/en-US/docs/Web/API/Popover_API

### 후속 적용 판단
- 기존 작은 Radix menu는 Radix portal/collision 계약을 유지한다.
- 큰 앱 오버레이는 React portal로 `.desktop-app-root`에 올려 theme token을 유지하면서 scroll/animation containing block을 피한다.
- modal성 surface에는 공통 focus containment hook을 적용한다.
- terminal drawer는 hidden tab/portal 이동 시 transition 시작값이 남는 것을 피하기 위해 open 상태에서 위치를 명시한다.
