# 웹 검색 기록: Workspace Monitor 정적 asset 경로 버그 수정

## 검색 일시

- 날짜: 2026-06-02
- 요청: 버그와 기능적 이슈를 찾아 해결한다.

## 쿼리

- `Next.js dynamic import named export ssr false App Router static export official docs`
- `Next.js static export public folder fetch JSON app router basePath official docs`
- `React useDeferredValue controlled input performance official docs`
- `Tauri v2 command invoke state Mutex Rust official docs`
- `Next.js static export output export assetPrefix docs`
- `Next.js assetPrefix documentation official`
- `MDN fetch URL object documentation`
- `Tauri frontendDist asset protocol static files docs`

## 확인한 출처

- Next.js static export official docs: https://nextjs.org/docs/canary/pages/building-your-application/deploying/static-exports
- Next.js `assetPrefix` official docs: https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix
- MDN `Window.fetch()` official docs: https://developer.mozilla.org/docs/Web/API/Window/fetch
- Tauri asset protocol official docs: https://v2.tauri.app/security/asset-protocol/
- Stack Overflow/Reddit/community 결과는 adoption/risk discovery 신호로만 보았고 사실 근거로 사용하지 않았다.

## 계획 영향

- Next.js static export는 HTML/CSS/JS 정적 asset serving을 전제로 하므로, desktop/subpath context에서 generated asset URL이 정확해야 한다.
- Next.js `assetPrefix`는 `_next/static` JavaScript/CSS path에 영향을 주므로 absolute `/_next` 회귀를 막는 설정으로 사용했다.
- MDN `fetch()`는 URL 객체를 resource 인자로 받을 수 있음을 설명하므로, snapshot fetch를 현재 문서 기준 `URL`로 바꾸었다.
- Tauri asset protocol은 일반 `file://`와 다른 WebView asset serving 경계가 있으므로, 일반 Chromium `file://` JSON fetch 실패를 Tauri 실패로 단정하지 않고 별도 smoke 과제로 남겼다.

## 불확실성

- Rust/Tauri toolchain이 없어 실제 packaged WebView smoke는 아직 실행하지 못했다.
- snapshot JSON 크기 자체는 이번 수정 범위가 아니다.
