# Request Trace: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 요청

- "사이드바 UI 문제 해결 옆에 이상한 스크롤 안 생기게 크기 조절"

## 산출물

- CSS 수정: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 테스트 수정: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 요구사항/스펙/검증 기록: `platform-desktop-app/docs/requirements/2026-06-07-sidebar-rail-scrollbar-fix.ko.md`, `platform-desktop-app/specs/2026-06-07-sidebar-rail-scrollbar-fix/`

## 결과

- activity rail nav의 phantom horizontal overflow 조건 제거.
- 기본/짧은 viewport Browser smoke 통과.

## 커밋

- 대기: 최종 git 검토 후 커밋한다.
