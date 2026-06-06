# Evaluation: Dark Mode Contrast Fix

날짜: 2026-06-07

## 평가

다크 모드 기본 화면에서 계산된 색상 대비를 감사했고, 실제 낮은 대비 항목은 하단 터미널 런처 숫자 배지였다. 전체 강조색을 바꾸지 않고, 흰 텍스트가 올라가는 배지만 selected control 토큰으로 바꿔 영향 범위를 줄였다.

## 결과

- 터미널 런처 숫자 배지 배경을 `--accent-primary`에서 `--control-selected-bg`로 변경.
- 배지 글자색을 `--text-inverse`에서 `--control-selected-fg`로 변경.
- light/dark 색상 토큰 테스트에 selected control 대비 검사 추가.
- UI 구조 테스트에 터미널 런처 배지 토큰 contract 추가.

## 검증

- renderer check 통과.
- renderer test 90개 통과.
- Browser dark smoke 통과: 수정 전 3.65:1 문제 확인, 수정 후 visible low contrast 목록 없음.
- dev server와 Browser tab cleanup 확인.
- collect, renderer production build, customer bundle audit 통과.
- platform check 통과. 기존 public release signing/notarization/updater/clean-machine smoke gate는 public 배포 gate로 남았다.
- omission guard, resource guard, work timer check, work evaluator 통과.

## 남은 위험

- 전체 앱의 모든 nested 화면 다크 테마 감사를 포함하지 않았다.
