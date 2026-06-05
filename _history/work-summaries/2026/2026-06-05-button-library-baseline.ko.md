# 작업 요약: Button Library Baseline

- Radix Slot/CVA 기반 공통 Button primitive를 추가했다.
- titlebar, task handoff, Tool Studio 대표 액션을 Button primitive로 migration했다.
- `ui-button` CSS variant/size token을 추가하고 static test로 dependency/API/use를 고정했다.
- desktop/mobile smoke에서 대표 Button 5개, 44px 이상 타깃, overflow 0을 확인했다.
- 스크린샷 artifact:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-button-library-baseline-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-button-library-baseline-mobile.png`
