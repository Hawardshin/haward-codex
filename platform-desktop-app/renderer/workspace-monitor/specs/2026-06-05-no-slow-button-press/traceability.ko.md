# 추적: 버튼 클릭 무지연 계약

| 항목 | 대상 | 검증 |
| --- | --- | --- |
| `REQ-WM-041` | `MonitorShell` instant button feedback, `globals.css` pressed state | static test, `perf:buttons` |
| `REQ-WM-055` | capture-phase `pointerdown`/`keydown` listener | 67-button sample audit |
| 성능 스크립트 | `scripts/audit-button-response.mjs`, `package.json` `perf:buttons` | CPU throttle 6 audit |
| 요구사항 | `docs/requirements/2026-06-01-workspace-monitor.*.md` | row audit |
| 기록 | `_history/**/2026-06-05-no-slow-button-press*` | close-out evaluation |
