# 작업 요약: Dropdown Trigger Baseline

- Tool Studio 주 드롭다운 버튼을 현재 세부 기능과 상위 흐름을 함께 보여주는 구조로 바꿨다.
- `aria-haspopup="menu"`, Radix `data-state` 기반 caret 회전, label ellipsis, 860px 이하 full-width 조정을 추가했다.
- 정적 테스트, build, perf budget, in-app Browser smoke, Playwright desktop/mobile smoke를 통과했다.
- 스크린샷 artifact:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-dropdown-trigger-baseline-desktop-open.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-dropdown-trigger-baseline-mobile-open.png`
