# 요청-결과 추적: 쉬운 AI 로그인 설정

## 요청

- 사용자가 AI 설정 기능을 더 늘리고, 로그인으로 AI provider 설정을 쉽게 할 수 있도록 요청했다.

## 결과

- Settings > Core settings > Account connection에 `AI 로그인 설정` 가이드와 provider filter를 추가했다.
- Provider card에 official login/key/docs, local runtime note, model check, work default selection, model chip UI를 추가했다.
- Renderer tests/readiness tokens와 requirements/spec/history records를 갱신했다.
- Internal desktop package build까지 실행했다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-06-easy-ai-login-settings.ko.md`
- `platform-desktop-app/specs/2026-06-06-easy-ai-login-settings/`
- `_history/evaluations/2026/2026-06-06-easy-ai-login-settings.ko.md`

## 검증 연결

- `platform-desktop-app/specs/2026-06-06-easy-ai-login-settings/validation.ko.md`
- `_history/omission-checks/2026/2026-06-06-easy-ai-login-settings.json`
- `_history/resource-checks/2026/2026-06-06-easy-ai-login-settings.json`
