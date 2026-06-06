# Plan: Dark Mode Contrast Fix

날짜: 2026-06-07

## 계획

1. web-first로 WCAG/다크 모드 색상 기준 확인.
2. 현재 다크 모드 화면의 계산된 색상과 대비 측정.
3. 낮은 대비 요소를 가장 작은 CSS 변경으로 수정.
4. 색상 토큰 테스트와 UI contract 테스트 추가.
5. Browser smoke, renderer check/test, collect/build/platform check 실행.
6. omission/resource/evaluator 기록 후 commit/push.

## 선택

- CSS token 사용처 수정이 가장 작고 안전하다.
- 전체 다크 팔레트 교체는 이번 요청보다 범위가 넓어 제외한다.
