# 2026-06-05 Bug Hunt Stale Customer Snapshot Web Search

## Trigger

- 사용자 지시: 버그 찾기.
- 목적: desktop/workspace-monitor 검증 경로에서 Next.js static export, Tauri frontendDist, Playwright/browser cache, Node test runner 기준을 확인한 뒤 로컬 버그 헌팅을 진행한다.

## Queries

- `Node.js test runner official docs`
- `Tauri v2 build configuration official docs`
- `Next.js static export official docs`
- `Playwright official docs browser install list`

## Checked Sources

- Node.js test runner: https://nodejs.org/api/test.html
- Tauri configuration: https://v2.tauri.app/reference/config/
- Next.js static exports: https://nextjs.org/docs/pages/guides/static-exports
- Playwright browsers: https://playwright.dev/docs/browsers

## Decision Impact

- Next.js static export는 `public/` asset을 `out/`으로 복사하므로 `public/workspace-snapshot.json`과 `out/workspace-snapshot.json`의 customer safety를 함께 본다.
- Tauri는 configured `frontendDist`를 package payload로 삼으므로 strict packaging audit은 계속 `out/` snapshot 누출을 실패로 유지한다.
- Node test runner 기반 existing tests를 우선 돌리고, stale generated snapshot 상태는 별도 reproduction assertion으로 고정한다.
- Playwright browser cache는 이번 수정 대상은 아니지만 desktop doctor 검증 항목이므로 유지 확인 대상에 포함한다.

## Weak Or Unused Sources

- Reddit, 일반 블로그, 오래된 mirror 문서는 이번 버그의 구현 판단에 쓰지 않았다.

## Public Summary

- 버그 헌팅은 최근 desktop setup/build 개선과 Workspace Monitor static export 경계에 집중했다.
