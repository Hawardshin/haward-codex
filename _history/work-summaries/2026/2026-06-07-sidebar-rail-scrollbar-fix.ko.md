# Work Summary: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 요약

좌측 사이드바 레일 옆에 생기던 이상한 스크롤 조건을 제거했다. nav 영역은 가로 스크롤을 만들지 않고, 화면 높이가 부족할 때만 세로로 스크롤한다.

## 구현

- `globals.css`에서 activity rail nav overflow 축과 scrollbar gutter를 조정했다.
- collapsed/expanded rail button width contract를 정리했다.
- `tool-studio.test.mjs`에 재발 방지 assertion을 추가했다.

## 검증 상태

- renderer check 통과.
- renderer test 90개 통과.
- Browser smoke에서 기본/짧은 viewport 모두 nav horizontal overflow 없음.
- collect, renderer production build, customer bundle audit, platform check 통과.
- omission guard, resource guard, work timer check, work evaluator 통과.
