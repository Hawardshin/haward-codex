# Visual Design Foundation 추적

| 항목 | 연결 |
| --- | --- |
| 사용자 요청 | "최고의 디자인" |
| 요구사항 | REQ-WM-058, REQ-WM-075 |
| 구현 | `components/MonitorShell.tsx`, `app/globals.css` |
| 테스트 | `tests/tool-studio.test.mjs` |
| 검증 | `test`, `check`, `build`, `build:customer`, `perf:budget`, desktop/mobile Playwright visual smoke |
| 기록 | `_history/web-searches/2026/2026-06-05-visual-design-foundation.ko.md`, `_history/web-searches/2026/2026-06-05-premium-apple-design-system.ko.md`, `_history/evaluations/2026/2026-06-05-premium-apple-design-system.ko.md` |

## 근거

- Apple HIG: 명확한 visual hierarchy와 platform-consistent controls.
- Apple Design Resources / Fonts: 공식 UI kit, color guide, symbol/font resources는 design consistency를 검증하는 참조이며, SF Pro는 라이선스상 번들 대신 Pretendard 유지가 적합하다.
- Material/Carbon: color, typography, interaction state를 token으로 관리.
- NN/g: 미니멀한 디자인은 장식 제거가 아니라 primary goal을 방해하지 않는 정보 우선순위.
