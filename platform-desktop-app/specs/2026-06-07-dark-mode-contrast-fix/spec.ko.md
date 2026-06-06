# Spec: Dark Mode Contrast Fix

날짜: 2026-06-07

## 문제

다크 모드에서 `.terminal-drawer-launcher strong` 숫자 배지가 `--accent-primary` 배경과 `--text-inverse` 흰 텍스트를 사용했다. 시스템 다크 모드에서 계산된 색은 `rgb(10, 132, 255)` 위 `rgb(255, 255, 255)`였고, 작은 숫자 텍스트의 대비는 `3.65:1`로 4.5:1 기준을 넘지 못했다.

## 설계

- 터미널 런처 숫자 배지는 `background: var(--control-selected-bg)`와 `color: var(--control-selected-fg)`를 사용한다.
- `--accent-primary`는 다크 배경 위 강조 텍스트/라인으로 계속 사용할 수 있게 유지한다.
- `color-tokens.test.mjs`에서 `control-selected-fg`와 `control-selected-bg` 대비를 light/dark 모두 검사한다.
- `tool-studio.test.mjs`에서 터미널 런처 배지가 selected control 토큰을 쓰는 CSS contract를 검사한다.

## 수용 기준

- Browser dark smoke에서 보이는 낮은 대비 텍스트 목록이 비어야 한다.
- 터미널 런처 숫자 배지 배경이 `rgb(0, 93, 184)`로 계산되어 흰 텍스트 대비가 4.5:1 이상이어야 한다.
- renderer check/test/build와 platform check가 통과해야 한다.
