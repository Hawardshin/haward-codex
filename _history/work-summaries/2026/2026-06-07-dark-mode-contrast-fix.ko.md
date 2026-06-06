# Work Summary: Dark Mode Contrast Fix

날짜: 2026-06-07

## 요약

다크 모드에서 하단 터미널 런처 숫자 배지의 낮은 대비 문제를 수정했다. 배지는 이제 selected control 색상 토큰을 사용해 흰 텍스트 대비를 확보한다.

## 구현

- `globals.css`에서 `.terminal-drawer-launcher strong` 색상 토큰 변경.
- `color-tokens.test.mjs`에 selected control 대비 검사 추가.
- `tool-studio.test.mjs`에 터미널 런처 배지 색상 contract 추가.

## 검증 상태

- renderer check 통과.
- renderer test 90개 통과.
- Browser dark smoke에서 visible low contrast 목록 없음.
- collect, renderer production build, customer bundle audit, platform check 통과.
- omission guard, resource guard, work timer check, work evaluator 통과.
