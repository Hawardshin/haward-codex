# Coding Research: Dark Mode Contrast Fix

날짜: 2026-06-07

## 기술 스택

- React 19, Next.js 16 renderer
- CSS custom properties
- Node test runner
- in-app Browser computed-style audit

## 언어/런타임 선택

- 옵션 A: CSS token 사용처 수정.
- 옵션 B: React에서 다크 모드별 별도 배지 컴포넌트 분기.
- 선택: CSS token 사용처 수정. 문제는 상태가 아니라 색상 의미의 오용이다.

## 아키텍처 선택

- 옵션 A: `--accent-primary`를 어둡게 바꾼다.
- 옵션 B: 흰 텍스트가 올라가는 배지는 `--control-selected-bg/fg`를 사용한다.
- 선택: 옵션 B. `--accent-primary`는 다크 배경 위 강조 텍스트와 라인에도 쓰이므로 전체 토큰을 어둡게 하면 다른 표면의 인식성이 떨어질 수 있다.

## 참고 소스

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/color-tokens.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- W3C WCAG 2.2 contrast minimum 문서

## 검증 메모

- 수정 전 터미널 런처 숫자 배지: `rgb(10, 132, 255)` 배경, 흰 텍스트, 대비 `3.65:1`.
- 수정 후 배지: `rgb(0, 93, 184)` 배경, 흰 텍스트.
- Browser dark smoke에서 visible low contrast 목록이 비었다.
