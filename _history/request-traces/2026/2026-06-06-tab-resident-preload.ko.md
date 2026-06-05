# 요청-결과 추적: 탭 상주 선마운트 최적화

## 요청

탭 이동 시 느린 마운트/불러오기 비용을 줄이기 위해 앱 시작 후 주요 탭을 미리 불러와 메모리에 두는 전역적 구조를 고려하고 구현해 달라는 요청.

## 결과

- 구현: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- 스타일: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-tab-resident-preload.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-tab-resident-preload/`
- 평가: `_history/evaluations/2026/2026-06-06-tab-resident-preload.ko.md`

## 검증 상태

workspace-monitor 단위 검증, 전체 앱 검증, 내부 패키징 빌드가 통과했다. in-app Browser 스모크는 dev 서버와 snapshot 응답은 확인했지만 화면이 `Loading workspace snapshot`에 머물러 resident DOM까지 확인하지 못했다.
