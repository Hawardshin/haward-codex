# Work Summary: Popup Scroll Clipping

날짜: 2026-06-06

## 변경 요약
- 팝업 레이어 공통 token을 추가했다.
- AppChoiceMenu, source file picker, Tool Studio dropdown/context menu가 Radix available-height와 viewport gap을 기준으로 높이를 제한하게 했다.
- 관련 Radix Content에 `collisionPadding={16}`을 명시했다.
- 스크롤 pane 밖에서 보이도록 포털 기반 메뉴 계약을 정적 테스트로 고정했다.

## 확인
- workspace-monitor 테스트 83개 통과.
- Browser smoke에서 Tool Studio menu와 source file picker가 작은 viewport에서 화면 안에 표시됨을 확인했다.
- source controls smoke, workspace-monitor check, platform-desktop-app test/check, internal package build, codesign verify, hdiutil verify를 통과했다.
