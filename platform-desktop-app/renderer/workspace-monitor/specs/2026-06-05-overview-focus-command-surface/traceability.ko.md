# 추적성

| 항목 | 연결 |
| --- | --- |
| 요구사항 | REQ-WM-057 |
| 사용자 요청 | `UI 근본 변화 대혁신` |
| 구현 파일 | `components/MonitorShell.tsx` |
| 스타일 파일 | `app/globals.css` |
| 테스트 파일 | `tests/tool-studio.test.mjs` |
| 검증 파일 | `validation.ko.md` |
| 이력 | `_history/request-traces/2026/2026-06-05-overview-focus-command-surface.ko.md` |

## 수락 기준

- `data-home-focus-command`, `data-home-focus-card`, `data-home-navigation-dock`가 Overview에 표시된다.
- focus command가 작업 dock보다 먼저 렌더링된다.
- focus card는 추천 작업, badge, next step preview, primary action을 제공한다.
- desktop과 390px mobile에서 수평 overflow가 없다.
