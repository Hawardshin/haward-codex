# Plan: Responsive Text Wrapping

1. CSS에서 전역 `overflow-wrap: anywhere` 사용 범위를 줄인다.
2. 일반 UI 문구와 긴 토큰 값을 분리하는 wrapping token/rule을 추가한다.
3. readiness script와 unit test에 버튼 텍스트 회귀 방지 검사를 추가한다.
4. TypeScript/test/build/check를 실행한다.
5. Browser QA로 mobile/desktop overflow와 visible button wrapping policy를 확인한다.
6. 결과와 잔여 위험을 history/evaluation에 기록한다.
