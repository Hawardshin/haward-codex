# Plan: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 계획

1. 공식 CSS overflow 참고 문서 확인.
2. 현재 activity rail DOM 크기와 scrollWidth/clientWidth 측정.
3. nav overflow 축과 gutter, button width contract 수정.
4. 구조 테스트 추가.
5. Browser smoke로 기본/짧은 viewport 검증.
6. renderer check/test/build, platform check, 누락/리소스/evaluation 검증.
7. 커밋 후 `origin/main` 푸시.

## 선택

- CSS-only 수정이 가장 작고 안전하다.
- React 상태나 섹션 구조는 변경하지 않는다.
