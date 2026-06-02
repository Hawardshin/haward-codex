# 스펙: Workspace Monitor 정적 asset 경로 버그 수정

## 목표

Workspace Monitor 정적 export가 HTTP root에만 묶이지 않고, desktop shell과 repository 서브패스 정적 serving에서도 JavaScript, CSS, workspace snapshot을 정상 로드하게 한다.

## 요구사항

- `REQ-WM-017`

## 발견된 문제

- `workspace-monitor/out/index.html`이 `/_next/static/...` absolute asset URL을 생성했다.
- `SnapshotLoader`가 `/workspace-snapshot.json` absolute URL을 fetch했다.
- `file://` smoke에서 `_next` asset을 `file:///_next/...`로 요청해 JavaScript와 CSS가 로드되지 않았다.
- repository-root 정적 serving에서 `/workspace-monitor/out/index.html`을 열면 같은 방식으로 root `_next`를 찾을 위험이 있었다.

## 동작

- `next.config.mjs`는 `assetPrefix: "./"`를 사용해 static export의 `_next` asset path를 문서 기준 상대 경로로 생성한다.
- `SnapshotLoader`는 `new URL("workspace-snapshot.json", window.location.href)`를 사용해 snapshot JSON도 현재 문서 위치 기준으로 fetch한다.
- `perf:budget`은 JavaScript chunk budget과 함께 generated `index.html`의 absolute `/_next` path 회귀를 검사한다.

## 수용 기준

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- repository root 정적 서버에서 `/workspace-monitor/out/index.html`을 Playwright로 열었을 때 `_next`/snapshot 요청 실패 없이 `Desktop` UI가 렌더링된다.

## 비범위

- 일반 Chromium `file://`에서 local JSON fetch를 강제로 허용하는 것
- Tauri public 배포 signing, notarization, updater
- snapshot JSON sharding/compression
