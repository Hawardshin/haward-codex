# Plan: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 선택한 구현

기존 titlebar에 breadcrumb를 추가한다. 별도 도움말이나 온보딩 문구를 늘리지 않고, 사용자가 실제 위치를 즉시 보는 구조를 만든다.

## 대안 비교

- 대안 A: titlebar breadcrumb 추가. 현재 위치 인식을 직접 개선하고 범위가 작다.
- 대안 B: 별도 도움말/가이드 패널 추가. 설명은 늘지만 화면 복잡도와 읽을거리가 증가한다.
- 선택: 대안 A. 혼란을 줄이는 핵심은 설명보다 위치와 상태를 보이게 하는 것이다.

## 단계

1. titlebar의 현재 섹션/그룹 상태 확인.
2. breadcrumb nav와 home action 추가.
3. no-drag, 말줄임, 모바일 overflow 방지 CSS 추가.
4. 구조 테스트 추가.
5. renderer check/test/build와 Browser smoke 실행.

## 검증 게이트

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm -w run desktop:renderer:build`
- Browser smoke: breadcrumb 표시, 홈 버튼 클릭, 모바일 overflow 없음
