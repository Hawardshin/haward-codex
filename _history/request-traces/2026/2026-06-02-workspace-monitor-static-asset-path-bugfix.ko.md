# 요청 추적: Workspace Monitor 정적 asset 경로 버그 수정

## 요청

- ID: `UR-2026-06-02-053`
- 요약: 버그와 기능적 이슈를 찾아 해결해 달라는 요청.

## 결과

- `workspace-monitor` 정적 export가 root-relative `_next` asset URL을 생성하는 문제를 재현했다.
- `next.config.mjs`에 `assetPrefix: "./"`를 적용해 `_next` asset path를 상대 경로로 바꿨다.
- `SnapshotLoader`가 `workspace-snapshot.json`을 현재 문서 위치 기준 URL로 fetch하도록 바꿨다.
- `perf:budget`에 absolute `/_next` asset path 회귀 검사를 추가했다.
- repository-root static server에서 `/workspace-monitor/out/index.html` Playwright smoke를 통과했다.

## 요구사항

- `REQ-WM-017`

## 산출물

- `workspace-monitor/next.config.mjs`
- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/scripts/check-performance-budget.mjs`
- `workspace-monitor/specs/2026-06-02-static-asset-path-bugfix/`
- `_research/topics/workspace-monitor/2026-06-02-static-asset-path-bugfix.ko.md`

## 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- repository-root static Playwright smoke
