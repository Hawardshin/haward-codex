# Plan: Button Text Wrapping

1. CSS에서 버튼 라벨 max inline token을 추가한다.
2. 공용 버튼과 액션 버튼 selector에 nowrap/ellipsis 계약을 적용한다.
3. 런타임, CLI, provider model chip, source editor, command palette의 기존 줄바꿈 예외를 제거한다.
4. 회귀 테스트를 추가한다.
5. workspace-monitor test/check, browser smoke, desktop app test/check/package로 검증한다.
6. history/evaluation/trace 문서를 갱신하고 commit/push한다.
