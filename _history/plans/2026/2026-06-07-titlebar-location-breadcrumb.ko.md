# Work Plan: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 목표

사용자가 현재 위치를 기억하지 않아도 상단 titlebar에서 바로 확인하게 한다.

## 실행 계획

1. web-first intake로 breadcrumb와 current-page 접근성 근거 확인.
2. local source에서 titlebar와 section state 확인.
3. existing state를 재사용해 breadcrumb 추가.
4. no-drag, responsive, overflow CSS 추가.
5. 구조 테스트, renderer checks, build, Browser smoke로 검증.
6. omission/resource/evaluation 기록 후 commit/push.

## 범위 제한

새 navigation framework, native command, dependency 설치는 하지 않는다.
