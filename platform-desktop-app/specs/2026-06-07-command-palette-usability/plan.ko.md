# Plan: Command Palette Usability

날짜: 2026-06-07

## 선택한 구현

기존 명령 팔레트에 상태 피드백과 추천 액션을 추가한다. 검색 랭킹이나 command registry 구조를 바꾸지 않고, 이미 존재하는 명령 id를 재사용해 작은 변경으로 사용 흐름을 개선한다.

## 대안 비교

- 대안 A: 명령 팔레트 내부 보강. 범위가 작고 기존 명령 실행 lifecycle을 그대로 사용한다.
- 대안 B: 별도 onboarding 또는 도움말 패널 추가. 설명은 늘지만 실제 실행까지 거리가 멀고 화면 복잡도가 증가한다.
- 선택: 대안 A. 사용자가 “뒤로 미루지 말라”고 요구한 맥락에 맞게 즉시 실행 가능한 개선이다.

## 단계

1. 명령 팔레트 command item 구조 확인.
2. 추천 명령 목록과 결과 상태 문자열 추가.
3. 기본/빈 결과 상태에 추천 버튼 렌더링.
4. CSS로 터치 영역, 말줄임, 빈 상태 레이아웃 보강.
5. 구조 테스트와 브라우저 스모크로 회귀 방지.

## 검증 게이트

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- renderer collect/build/platform check
- Browser smoke: 기본 추천 명령, 빈 결과 상태, 추천 명령 클릭 흐름
