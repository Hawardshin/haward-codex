# Coding Research: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 기술 스택

- React 19, Next.js 16 renderer
- CSS grid/flex layout
- Node test runner
- in-app Browser smoke

## 언어/런타임 선택

- 옵션 A: CSS-only 수정.
- 옵션 B: React에서 viewport 높이에 따라 사이드바 모드를 동적으로 바꾸기.
- 선택: CSS-only. 원인이 CSS gutter와 button width contract라 상태 로직 변경보다 유지보수 위험이 낮다.

## 아키텍처 선택

- 옵션 A: activity rail nav의 overflow 축과 button width contract를 명시한다.
- 옵션 B: nav 항목 수를 줄이거나 메뉴를 재구성한다.
- 선택: 옵션 A. 사용자 요청은 이상한 스크롤 제거와 크기 조절이며 정보구조 변경은 범위를 넓힌다.

## 참고 소스

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- MDN overflow와 scrollbar-gutter 문서
- web.dev overflow 학습 문서

## 검증 메모

- 수정 전 기본 viewport에서 `navClientWidth=48`, `navScrollWidth=58`.
- 수정 후 기본 viewport에서 `navClientWidth=59`, `navScrollWidth=59`.
- 짧은 viewport에서 `navClientWidth=48`, `navScrollWidth=48`, 세로 overflow만 남음.
