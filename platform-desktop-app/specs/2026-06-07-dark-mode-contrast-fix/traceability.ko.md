# Traceability: Dark Mode Contrast Fix

날짜: 2026-06-07

## 요청 연결

- 사용자 요청: "다크모드 색상 문제 해결해줘"
- 선택한 slice: 다크 모드 터미널 런처 숫자 배지 대비 수정

## 요구사항 연결

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-07-dark-mode-contrast-fix.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-07-dark-mode-contrast-fix/spec.ko.md`
- 계획: `platform-desktop-app/specs/2026-06-07-dark-mode-contrast-fix/plan.ko.md`
- 작업: `platform-desktop-app/specs/2026-06-07-dark-mode-contrast-fix/tasks.ko.md`
- 검증: `platform-desktop-app/specs/2026-06-07-dark-mode-contrast-fix/validation.ko.md`

## 구현 연결

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/color-tokens.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증 연결

- renderer check/test 통과.
- Browser dark smoke 통과.
- collect/build/platform/evaluation 기록 완료.
