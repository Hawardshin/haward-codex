# 데스크톱 크롬 디자인 개선 추적성

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-DESIGN-POLISH-001 | `globals.css`의 chrome/rail/section/control shadow 토큰, titlebar/panel 연결 | `Desktop chrome uses elevated navigation and tab states` |
| REQ-DESIGN-POLISH-002 | `.activity-rail button[aria-current="page"]`, `.activity-rail nav button::before` | activity rail 정적 테스트 |
| REQ-DESIGN-POLISH-003 | `.section-tabs button`, `.panel-heading button`, `.section-tabs button.active` | desktop chrome 정적 테스트 |
| REQ-DESIGN-POLISH-004 | global button transition, press shadow, `.ui-button:hover` | renderer test, Browser smoke |
| REQ-DESIGN-POLISH-005 | `.theme-dark`, `.theme-system` dark token definitions | CSS 정적 테스트와 build |
| REQ-DESIGN-POLISH-006 | test/build/package/browser 실행 기록 | `validation.ko.md`, history evaluation |

## 소스 경계

- 이번 변경은 `platform-desktop-app/renderer/workspace-monitor`의 디자인 표면과 그 테스트에 한정한다.
- 문서/히스토리 파일은 요구사항과 검증 추적을 위한 durable artifact다.
