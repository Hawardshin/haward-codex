# Plan: Intuitive Home Flow

## 범위 분해

- 전체 UI/UX 개선 요청은 크므로 첫 slice를 홈 시작 흐름으로 제한한다.
- 근거: 홈은 첫 진입점이며 이미 task intent와 section handoff가 있어 작은 변경으로 흐름성을 높일 수 있다.

## 구현 순서

1. 홈 시작 흐름 타입과 4단계 데이터 추가.
2. 홈 첫 화면에 `home-start-flow` section 추가.
3. 기존 surface token에 맞춘 CSS와 responsive contract 추가.
4. 문자열 계약 테스트 보강.
5. check/test/build/browser smoke 실행.
