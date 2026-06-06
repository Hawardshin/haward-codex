# Work Summary: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 요약

앱 상단 titlebar에 현재 위치 breadcrumb를 추가했다. 이제 사용자는 현재 화면이 홈, 기능 그룹, 섹션 중 어디에 속하는지 바로 볼 수 있고, `홈`을 눌러 overview로 돌아갈 수 있다.

## 구현

- `MonitorShell.tsx`에 titlebar breadcrumb nav 추가.
- `globals.css`에 breadcrumb 스타일, no-drag 범위, 모바일 root/shell width reset 추가.
- `tool-studio.test.mjs`에 breadcrumb와 모바일 width reset contract 추가.

## 검증 상태

- renderer check 통과.
- renderer test 90개 통과.
- collect, renderer production build, customer bundle audit, platform check 통과.
- Browser smoke에서 breadcrumb 표시, tools 이동, home 복귀, 모바일 overflow, server cleanup 확인.
- omission guard, resource guard, work timer check, work evaluator 통과.
