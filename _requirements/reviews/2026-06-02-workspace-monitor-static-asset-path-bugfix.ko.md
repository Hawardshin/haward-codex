# 요구사항 리뷰: Workspace Monitor 정적 asset 경로 버그 수정

## 리뷰 대상

- `REQ-WM-017`

## 판단

- 상태: 승인
- 이유: 기존 정적 export는 HTTP root에서는 동작하지만, desktop shell과 repository 서브패스 serving에서는 `_next`와 snapshot JSON을 root-relative로 요청해 주요 화면 렌더링이 깨질 수 있었다. 요구사항은 재현과 검증이 가능한 기능적 안정성 조건이다.

## 근거

- 수정 전 `file://` smoke: `_next` asset이 `file:///_next/...`로 요청되어 `ERR_FILE_NOT_FOUND` 발생
- 수정 후 `out/index.html`: `_next` asset path가 `./_next/...`로 생성됨
- 수정 후 repository-root static smoke: `/workspace-monitor/out/index.html`에서 `Desktop` UI 렌더링, `_next`/snapshot 요청 실패 없음
- 검증: `npm run check`, `npm test`, `npm run build`, `npm run perf:budget`, Playwright subpath smoke

## 남은 후속

- 일반 Chromium `file://`는 local JSON fetch를 막으므로 실제 desktop packaged runtime에서는 Tauri WebView asset protocol smoke를 별도로 실행해야 한다.
- snapshot JSON sharding/compression은 별도 성능 과제로 남긴다.
