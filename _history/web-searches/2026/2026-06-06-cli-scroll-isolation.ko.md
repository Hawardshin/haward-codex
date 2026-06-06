# 웹 검색 기록: CLI 스크롤 겹침 제거

- 날짜: 2026-06-06
- 요청 요약: CLI 기능이 다른 스크롤 영역과 겹쳐 설정 화면 사용성이 낮다는 문제를 수정한다.

## 검색어

- `nested scroll containers UX avoid scroll jacking settings panels desktop app design`
- `Apple Human Interface Guidelines scroll views macOS avoid nested scroll views`
- `Microsoft Fluent UI scrollable pane layout avoid nested scrolling`
- `MDN overscroll-behavior contain nested scroll containers`

## 확인한 출처

- MDN, `overscroll-behavior`: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
- Apple Human Interface Guidelines, `Scrolling`: https://developer.apple.com/design/human-interface-guidelines/scrolling
- Microsoft Learn, `ScrollViewer`: https://learn.microsoft.com/en-us/windows/apps/design/controls/scroll-controls

## 적용한 인사이트

- 중첩 스크롤은 scroll chaining과 조작 대상 혼동을 만들 수 있으므로 scroll owner를 명확히 정한다.
- 모달 바깥 overlay는 배경 역할만 하고, 실제 내용 스크롤은 모달 내부의 한 패널에 제한하는 것이 예측 가능하다.
- 내부 CLI command 영역은 별도 scrollbar가 아니라 wrap 가능한 grid와 안정적인 줄바꿈으로 처리한다.

## 약한 출처

- 일반 블로그와 forum 글은 이번 구현 근거로 사용하지 않았다.

## 계획 영향

- CLI 기능 자체에 새 process/runtime을 추가하지 않고, 설정 모달과 CLI command controls의 scroll ownership을 바로 수정한다.
