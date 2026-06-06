# Agent 탭 시작 선로딩 웹 검색 기록

- 날짜: 2026-06-06
- 요청 요약: 시작 시점의 로딩 시간을 더 쓰더라도 Agent 탭을 포함한 주요 탭을 먼저 띄워 첫 탭 진입 지연을 줄인다.

## 검색

- `React lazy Suspense preload code splitting official docs preloading tabs`
- `Next.js app router dynamic import lazy loading official docs preload`
- `Tauri v2 webview performance preload app startup official docs`

## 확인한 출처

- React `lazy`: https://react.dev/reference/react/lazy
- React `Suspense`: https://react.dev/reference/react/Suspense
- Next.js Lazy Loading guide: https://nextjs.org/docs/app/guides/lazy-loading
- Tauri v2 documentation: https://v2.tauri.app/

## 반영

- loader는 가볍게 유지하고 heavy shell은 별도 boundary에서 lazy-load한다.
- 초기 loading window와 shell 내부 warmup overlay를 분리해 탭 패널 mount 비용을 시작 시간으로 이동한다.
- dev hydration은 static export 설정과 분리해 일반 Next dev 경로에서 동작하게 한다.

## 약한 출처 제외

- 블로그/커뮤니티 글은 이번 구현 결정에 필요하지 않아 인용하지 않았다.
