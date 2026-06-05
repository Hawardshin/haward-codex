# Industrial Control Affordance 추적

| 항목 | 연결 |
| --- | --- |
| 사용자 요청 | "너는 엄청난 산업 디자이너야" |
| 요구사항 | REQ-WM-059 |
| 구현 | `components/MonitorShell.tsx`, `app/globals.css` |
| 테스트 | `tests/tool-studio.test.mjs` |
| 검증 | `test`, `check`, `build:customer`, `perf:budget`, desktop/mobile visual smoke |
| 기록 | `_history/web-searches/2026/2026-06-05-industrial-control-affordance.ko.md`, `_history/evaluations/2026/2026-06-05-industrial-control-affordance.ko.md` |

## 근거

- Apple HIG: 컨트롤은 명확한 visual hierarchy와 일관된 interaction feedback을 가져야 한다.
- Material Design: 버튼은 상태와 action을 시각적으로 구분해야 한다.
- Carbon buttons: 제품 UI의 버튼은 목적, hierarchy, 상태가 일관되어야 한다.
- Fitts's Law: 목표 크기와 도달 위치는 조작 속도와 정확도에 직접 영향을 준다.
