# 요청-결과 추적: Text Wrapping Contract

## 요청

- 텍스트가 줄바꿈으로 이상해지지 않게 개선.

## 결과

- REQ-WM-069 추가.
- `globals.css`에 prose, label, long-token, button child text wrapping contract 추가.
- `font-loading.test.mjs`에 static regression test 추가.
- desktop/mobile Browser smoke와 screenshot artifact 생성.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/font-loading.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-text-wrapping-contract/`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-text-wrapping-contract-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-text-wrapping-contract-mobile.png`
- `_history/evaluations/2026/2026-06-05-text-wrapping-contract.ko.md`

## 검증

- `test`, `tsc --noEmit`, `check`, `build`, `build:customer`, `perf:budget`, in-app Browser smoke, Playwright screenshot smoke, `git diff --check` 통과.
