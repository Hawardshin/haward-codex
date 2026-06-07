# 2026-06-07 다크모드 색상 일관성 요청 추적

## 요청

- 다크모드일 때 색상 일관성 문제를 개선한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/color-tokens.test.mjs`
- `_history/user-requests/2026/2026-06-07-dark-mode-color-consistency.ko.md`
- `_history/web-searches/2026/2026-06-07-dark-mode-color-consistency.ko.md`
- `_history/plans/2026/2026-06-07-dark-mode-color-consistency.ko.md`
- `_history/work-summaries/2026/2026-06-07-dark-mode-color-consistency.ko.md`
- `_history/omission-checks/2026/2026-06-07-dark-mode-color-consistency.ko.md`
- `_history/resource-checks/2026/2026-06-07-dark-mode-color-consistency.ko.md`
- `_history/evaluations/2026/2026-06-07-dark-mode-color-consistency.ko.md`

## 결과

- 다크 팔레트를 정리하고 실제 렌더 배경 불일치를 보정했다.
- 색상 일관성 회귀 테스트를 추가했다.

## 검증

- 색상 테스트, 전체 테스트, 타입/계약 체크 통과.
- `corepack pnpm run desktop:package:run:internal` 통과.
- macOS `.app` 서명 검증과 DMG `hdiutil verify` 통과.
