# 추적성: Workspace Monitor 정적 asset 경로 버그 수정

## 요청

- `UR-2026-06-02-053`: 버그와 기능적 이슈를 찾아 해결해 달라는 요청

## 요구사항

- `REQ-WM-017`

## 소스 변경

- `workspace-monitor/next.config.mjs`
- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/scripts/check-performance-budget.mjs`

## 검증

- `workspace-monitor/specs/2026-06-02-static-asset-path-bugfix/validation.ko.md`
- `_history/evaluations/2026/2026-06-02-workspace-monitor-static-asset-path-bugfix-evaluation-result.json`

## 외부 근거

- Next.js static export와 `assetPrefix` 공식 문서
- MDN `window.fetch()` URL 인자 공식 문서
- Tauri asset protocol 공식 문서
