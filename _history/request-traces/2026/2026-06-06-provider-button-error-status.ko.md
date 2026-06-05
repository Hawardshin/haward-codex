# 요청-결과 추적: Provider 버튼 오류 상태

## 요청

- 오류 텍스트 때문에 버튼 위치가 밀리지 않고, 오류가 났을 때 버튼 자체에 표기되게 해달라는 요청.

## 결과

- Provider action feedback state를 추가했다.
- Provider 액션 버튼에 오류/완료/정보 badge를 표시한다.
- provider 설정의 visible error/notice paragraph 삽입을 hidden live region으로 대체했다.
- Renderer test와 readiness token을 갱신했다.
- Browser layout smoke와 internal desktop package build까지 완료했다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-06-provider-button-error-status.ko.md`
- `platform-desktop-app/specs/2026-06-06-provider-button-error-status/`

## 검증 연결

- `platform-desktop-app/specs/2026-06-06-provider-button-error-status/validation.ko.md`
- `_history/omission-checks/2026/2026-06-06-provider-button-error-status.json`
- `_history/resource-checks/2026/2026-06-06-provider-button-error-status.json`
