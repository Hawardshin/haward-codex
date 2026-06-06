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
