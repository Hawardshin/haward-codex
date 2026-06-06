# Plan: Popup Scroll Clipping

1. 웹 기준 확인: overflow clipping, portal, collision-aware popup 기준을 확인한다.
2. 현재 앱의 팝업 지점 확인: AppChoiceMenu, source file picker, Tool Studio dropdown/context menu.
3. CSS 팝업 레이어 토큰과 Radix available-height max-height 계약을 추가한다.
4. 관련 Radix Content에 collision padding을 명시한다.
5. 회귀 테스트와 Browser 실측을 추가/실행한다.
6. workspace monitor와 desktop app 검증, 내부 패키징, 커밋/푸시를 완료한다.

## 리스크
- 팝업 높이를 너무 작게 제한하면 목록 탐색이 불편해질 수 있다.
- 포털 z-index를 과도하게 올리면 modal hierarchy가 꼬일 수 있다. 이번 변경은 앱 팝업 전용 token `140`으로 제한한다.
