# 요청-결과 추적: IntelliJ식 실행 작업대

| 항목 | 내용 |
| --- | --- |
| 요청 | 기능을 더 추가하고 UI에 잘 녹이며 IntelliJ 디자인을 참고 |
| 요구사항 | `platform-desktop-app/docs/requirements/2026-06-04-intellij-run-workbench.ko.md` |
| 스펙 | `platform-desktop-app/specs/2026-06-04-intellij-run-workbench/` |
| 구현 | `MonitorShell.tsx`, `globals.css` |
| 계약 | `check-readiness.mjs`, product/user-flow/reference registries |
| 검색 기록 | `_history/web-searches/2026/2026-06-04-intellij-run-workbench.ko.md` |
| 평가 | `_history/evaluations/2026/2026-06-04-intellij-run-workbench.ko.md` |

## 결과

Desktop Runtime이 기존 Quick Start와 세부 패널 앞에 IntelliJ식 실행 작업대를 갖게 됐다. 실행 구성 카드는 실제 검색 에이전트, CLI 세션, task pipe, readiness 점검에 연결된다.
